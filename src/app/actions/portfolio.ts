"use server";

import { PrismaClient } from "@prisma/client";
import { deleteMultipleFiles, uploadFile, uploadMultipleFiles } from "./upload";

const prisma = new PrismaClient();

export async function getPortfolioByUuid(uuid: string) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: uuid },
      include: { galery: true },
    });

    if (!portfolio) {
      return { success: false, error: "Portofolio tidak ditemukan" };
    }

    return { success: true, data: portfolio };
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return { success: false, error: "Gagal mengambil data portofolio" };
  }
}

export async function deletePortfolio(uuid: string) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: uuid },
      include: { galery: true },
    });

    if (!portfolio) {
      return { success: false, error: "Portofolio tidak ditemukan" };
    }

    const filesToDelete: string[] = [];

    if (portfolio.thumbnail) {
      const thumbnailFile = portfolio.thumbnail.replace("/uploads/", "");
      filesToDelete.push(thumbnailFile);
    }

    for (const image of portfolio.galery) {
      const imageFile = image.image_url.replace("/uploads/", "");
      filesToDelete.push(imageFile);
    }

    if (filesToDelete.length > 0) {
      await deleteMultipleFiles(filesToDelete);
    }

    await prisma.portfolio.delete({
      where: { id: uuid },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return { success: false, error: "Gagal menghapus portofolio" };
  }
}

export async function getPortfolios() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { created_at: "desc" },
      include: { galery: true },
    });
    return { success: true, data: portfolios };
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return { success: false, error: "Gagal mengambil data portofolio" };
  }
}

interface CreatePortfolioInput {
  thumbnail: File;
  name: string;
  category: string;
  description: string;
  demo_link?: string;
  repository_link: string;
  status?: string;
  tech_stacks?: string[];
  galery?: File[];
}

export async function createPortfolio(data: CreatePortfolioInput) {
  try {
    const thumbnailFormData = new FormData();
    thumbnailFormData.append("file", data.thumbnail);
    const thumbnailResult = await uploadFile(thumbnailFormData);

    if (!thumbnailResult.success) {
      return { success: false, error: "Gagal upload thumbnail" };
    }

    let galleryUrls: string[] = [];
    if (data.galery && data.galery.length > 0) {
      const galeryFormData = new FormData();
      data.galery.forEach((file) => {
        galeryFormData.append("files", file);
      });
      const galeryResult = await uploadMultipleFiles(galeryFormData);

      if (galeryResult.uploaded) {
        galleryUrls = galeryResult.uploaded.map((item) => item.url);
      }
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        thumbnail: thumbnailResult.url!,
        name: data.name,
        category: data.category,
        description: data.description,
        demo_link: data.demo_link || null,
        repository_link: data.repository_link,
        status: data.status || "draft",
        tech_stacks: data.tech_stacks || [],
        galery: {
          create: galleryUrls.map((url) => ({
            image_url: url,
          })),
        },
      },
      include: {
        galery: true,
      },
    });

    return { success: true, data: portfolio };
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return { success: false, error: "Gagal membuat portofolio" };
  }
}
