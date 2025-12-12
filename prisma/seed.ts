import { PrismaClient, UserRole, Platform } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@socialperks.test" },
    update: {},
    create: {
      email: "admin@socialperks.test",
      name: "Admin User",
      role: UserRole.ADMIN,
      emailVerified: new Date(),
    },
  });
  console.log("Created admin:", admin.email);

  // Create Merchant user
  const merchant = await prisma.user.upsert({
    where: { email: "merchant@socialperks.test" },
    update: {},
    create: {
      email: "merchant@socialperks.test",
      name: "Demo Merchant",
      role: UserRole.MERCHANT,
      emailVerified: new Date(),
    },
  });
  console.log("Created merchant:", merchant.email);

  // Create Customer user (also the dev login)
  const customer = await prisma.user.upsert({
    where: { email: "dev@socialperks.test" },
    update: {},
    create: {
      email: "dev@socialperks.test",
      name: "Dev User",
      role: UserRole.CUSTOMER,
      emailVerified: new Date(),
    },
  });
  console.log("Created customer:", customer.email);

  // Create Demo Business
  const business = await prisma.business.upsert({
    where: { slug: "demo-cafe" },
    update: {},
    create: {
      name: "Demo Cafe",
      slug: "demo-cafe",
      description: "A cozy cafe perfect for your Instagram posts",
      address: "123 Main Street, Anytown, USA",
      phone: "(555) 123-4567",
      website: "https://democafe.example.com",
      ownerId: merchant.id,
    },
  });
  console.log("Created business:", business.name);

  // Create Demo Campaign
  const campaign = await prisma.campaign.upsert({
    where: { id: "demo-campaign-001" },
    update: {},
    create: {
      id: "demo-campaign-001",
      businessId: business.id,
      name: "Share Your Coffee Moment",
      description: "Post a photo of your coffee and earn $2 credit!",
      rewardAmountCents: 200, // $2.00
      requiredHashtag: "#DemoCafe",
      platform: Platform.INSTAGRAM,
      postingWindowHours: 2,
      minPostDurationHours: 24,
      suggestedDisclosure: "Thanks to @democafe for the discount! #ad #sponsored",
      maxRedemptionsPerUser: 1,
      isActive: true,
    },
  });
  console.log("Created campaign:", campaign.name);

  console.log("\nSeed completed successfully!");
  console.log("\nDemo accounts:");
  console.log("  Admin:    admin@socialperks.test");
  console.log("  Merchant: merchant@socialperks.test");
  console.log("  Customer: dev@socialperks.test (press 'd' on login page)");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
