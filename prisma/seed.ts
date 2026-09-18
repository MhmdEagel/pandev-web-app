// @ts-nocheck
import { PrismaClient, Role } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "better-auth/crypto";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const existingUser = await prisma.user.findUnique({
    where: { email: "admin@gmail.com" },
  });

  if (existingUser) {
    console.log("Admin user already exists, skipping...");
    return;
  }

  const hashedPassword = await hashPassword("password123");

  const user = await prisma.user.create({
    data: {
      fullname: "Admin PanDev",
      email: "admin@gmail.com",
      emailVerified: true,
      role: Role.ADMIN,
      accounts: {
        create: {
          issuer: "local:credential",
          accountId: "pending-admin",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
    include: { accounts: true },
  });

  const user2 = await prisma.user.create({
    data: {
      fullname: "John Lieber",
      email: "johnliebert@yopmail.com",
      emailVerified: true,
      role: Role.USER,
      accounts: {
        create: {
          issuer: "local:credential",
          accountId: "pending-user",
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
    include: { accounts: true },
  });

  // Update accountId to match user id (required by better-auth)
  await prisma.account.update({
    where: { id: user.accounts[0].id },
    data: { accountId: user.id },
  });

  await prisma.account.update({
    where: { id: user2.accounts[0].id },
    data: { accountId: user2.id },
  });

  console.log("Created admin user:", user.email);
  console.log("Password: password123");
  console.log("Role:", user.role);

  console.log("Created basic user:", user2.email);
  console.log("Password: password123");
  console.log("Role:", user2.role);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed successfully!");
  })
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
