"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Platform } from "@prisma/client";

const campaignSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().optional(),
  rewardAmountDollars: z.coerce.number().min(0.01).max(100),
  requiredHashtag: z.string().optional(),
  platform: z.enum(["INSTAGRAM", "TIKTOK", "FACEBOOK", "TWITTER", "YOUTUBE", "OTHER"]),
  postingWindowHours: z.coerce.number().min(1).max(48).default(2),
  minPostDurationHours: z.coerce.number().min(1).max(168).default(24),
  suggestedDisclosure: z.string().optional(),
});

export type CampaignFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    rewardAmountDollars?: string[];
    requiredHashtag?: string[];
    platform?: string[];
    postingWindowHours?: string[];
    minPostDurationHours?: string[];
    suggestedDisclosure?: string[];
    _form?: string[];
  };
  message?: string;
};

export async function createCampaign(
  prevState: CampaignFormState,
  formData: FormData
): Promise<CampaignFormState> {
  const session = await auth();
  if (!session?.user) {
    return { errors: { _form: ["Not authenticated"] } };
  }

  // Get merchant's business
  const business = await prisma.business.findFirst({
    where: { ownerId: session.user.id },
  });

  if (!business) {
    return { errors: { _form: ["No business found. Please complete onboarding first."] } };
  }

  const validatedFields = campaignSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    rewardAmountDollars: formData.get("rewardAmountDollars"),
    requiredHashtag: formData.get("requiredHashtag"),
    platform: formData.get("platform"),
    postingWindowHours: formData.get("postingWindowHours"),
    minPostDurationHours: formData.get("minPostDurationHours"),
    suggestedDisclosure: formData.get("suggestedDisclosure"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  try {
    const campaign = await prisma.campaign.create({
      data: {
        businessId: business.id,
        name: data.name,
        description: data.description || null,
        rewardAmountCents: Math.round(data.rewardAmountDollars * 100),
        requiredHashtag: data.requiredHashtag || null,
        platform: data.platform as Platform,
        postingWindowHours: data.postingWindowHours,
        minPostDurationHours: data.minPostDurationHours,
        suggestedDisclosure: data.suggestedDisclosure || `Partnering with ${business.name} #ad`,
      },
    });

    revalidatePath("/app/business/campaigns");
    redirect(`/app/business/campaigns/${campaign.id}`);
  } catch (error) {
    console.error("Failed to create campaign:", error);
    return { errors: { _form: ["Failed to create campaign"] } };
  }
}

export async function getMerchantCampaigns() {
  const session = await auth();
  if (!session?.user) return [];

  const business = await prisma.business.findFirst({
    where: { ownerId: session.user.id },
  });

  if (!business) return [];

  return prisma.campaign.findMany({
    where: { businessId: business.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCampaignById(id: string) {
  const session = await auth();
  if (!session?.user) return null;

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      business: true,
      visits: {
        include: {
          submission: {
            include: {
              verification: true,
            },
          },
        },
      },
    },
  });

  // Verify ownership
  if (campaign?.business.ownerId !== session.user.id && session.user.role !== "ADMIN") {
    return null;
  }

  return campaign;
}

export async function toggleCampaignStatus(campaignId: string) {
  const session = await auth();
  if (!session?.user) return { error: "Not authenticated" };

  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: { business: true },
  });

  if (!campaign || campaign.business.ownerId !== session.user.id) {
    return { error: "Campaign not found" };
  }

  await prisma.campaign.update({
    where: { id: campaignId },
    data: { isActive: !campaign.isActive },
  });

  revalidatePath(`/app/business/campaigns/${campaignId}`);
  revalidatePath("/app/business/campaigns");

  return { success: true };
}

export async function getMerchantBusiness() {
  const session = await auth();
  if (!session?.user) return null;

  return prisma.business.findFirst({
    where: { ownerId: session.user.id },
  });
}
