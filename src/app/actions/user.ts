"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "better-auth/crypto";
import { headers } from "next/headers";

export async function updateUserProfile(data: { fullname: string; email: string }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    if (data.email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== userId) {
        return { success: false, error: "Email sudah digunakan oleh pengguna lain" };
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullname: data.fullname,
        email: data.email,
      },
    });

    return { success: true, data: { fullname: updatedUser.fullname, email: updatedUser.email } };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: "Gagal mengupdate profil" };
  }
}

export async function updatePassword(data: { currentPassword: string; newPassword: string }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        issuer: "local:credential",
        providerId: "credential",
      },
    });

    if (!account || !account.password) {
      return { success: false, error: "Akun tidak memiliki password" };
    }

    const isCurrentPasswordValid = await verifyPassword({
      password: data.currentPassword,
      hash: account.password,
    });

    if (!isCurrentPasswordValid) {
      return { success: false, error: "Password saat ini salah" };
    }

    const hashedNewPassword = await hashPassword(data.newPassword);

    await prisma.account.update({
      where: { id: account.id },
      data: { password: hashedNewPassword },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error: "Gagal mengupdate password" };
  }
}

export async function addUser(data: {
  fullname: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    if (session.user.role !== "ADMIN") {
      return { success: false, error: "Hanya admin yang dapat membuat user" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { success: false, error: "Email sudah digunakan" };
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        role: data.role,
        accounts: {
          create: {
            issuer: "local:credential",
            accountId: "",
            providerId: "credential",
            password: hashedPassword,
          },
        },
      },
      include: { accounts: true },
    });

    await prisma.account.update({
      where: { id: user.accounts[0].id },
      data: { accountId: user.id },
    });

    return { success: true, data: { id: user.id, fullname: user.fullname, email: user.email } };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Gagal membuat user" };
  }
}

export async function updateUserImage(imageUrl: string | null) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    });

    return { success: true, data: { image: updatedUser.image } };
  } catch (error) {
    console.error("Error updating user image:", error);
    return { success: false, error: "Gagal mengupdate avatar" };
  }
}
