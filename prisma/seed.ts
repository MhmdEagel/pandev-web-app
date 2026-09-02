// @ts-nocheck
import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const existingUser = await prisma.user.findUnique({
    where: { email: "admin@pandev.com" },
  });

  if (existingUser) {
    console.log("Admin user already exists, skipping...");
    return;
  }

  const hashedPassword = await hashPassword("password123");

  const user = await prisma.user.create({
    data: {
      fullname: "Demo Akun",
      email: "demoakun@pandev.com",
    emailVerified: true,
      role: Role.USER,
      accounts: {
        create: {
          issuer: "local:credential",
          accountId: "", // will be set after user creation
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

  console.log("Created admin user:", user.email);
  console.log("Email: admin@pandev.com");
  console.log("Password: password123");
  console.log("Role:", user.role);
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
