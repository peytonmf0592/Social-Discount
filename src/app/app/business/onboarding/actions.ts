"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const businessSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type BusinessFormState = {
  errors?: {
    name?: string[];
    slug?: string[];
    description?: string[];
    address?: string[];
    phone?: string[];
    website?: string[];
    _form?: string[];
  };
  message?: string;
};

export async function createBusiness(
  prevState: BusinessFormState,
  formData: FormData
): Promise<BusinessFormState> {
  const session = await auth();
  if (!session?.user) {
    return { errors: { _form: ["Not authenticated"] } };
  }

  // Check if user already has a business
  const existingBusiness = await prisma.business.findFirst({
    where: { ownerId: session.user.id },
  });

  if (existingBusiness) {
    redirect("/app/business");
  }

  const validatedFields = businessSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug")?.toString().toLowerCase().trim(),
    description: formData.get("description"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    website: formData.get("website"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  // Check if slug is taken
  const slugExists = await prisma.business.findUnique({
    where: { slug: data.slug },
  });

  if (slugExists) {
    return {
      errors: { slug: ["This URL is already taken"] },
    };
  }

  try {
    // Update user role to MERCHANT if they're a CUSTOMER
    if (session.user.role === "CUSTOMER") {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { role: "MERCHANT" },
      });
    }

    await prisma.business.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        address: data.address || null,
        phone: data.phone || null,
        website: data.website || null,
        ownerId: session.user.id,
      },
    });

    revalidatePath("/app/business");
    redirect("/app/business");
  } catch (error) {
    console.error("Failed to create business:", error);
    return { errors: { _form: ["Failed to create business"] } };
  }
}
