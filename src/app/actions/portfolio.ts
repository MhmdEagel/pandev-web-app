"use server";

import { PrismaClient } from "@prisma/client";
import { uploadFile, uploadMultipleFiles } from "./upload";

const prisma = new PrismaClient();

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
