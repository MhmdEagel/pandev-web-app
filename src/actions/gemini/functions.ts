import { PORTFOLIO_CATEGORIES } from "@/app/dashboard/portfolio/_constants/categories";
import { AVAILABLE_TECH_STACKS } from "@/lib/constants";
import { Type } from "@google/genai";
import z from "zod";

const formSchema = z.object({
  thumbnail: z.string().min(1, "Thumbnail wajib diupload"),
  name: z.string().min(1, "Nama wajib diisi"),
  status: z.string().min(1, "Status wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  demo_link: z.string().optional(),
  repository_link: z.string().min(1, "Link Repository wajib diisi"),
  galery: z.array(z.string()).optional(),
});

const createPortfolioFunction = {
  type: "function" as const,
  name: "create_portfolio",
  description: "create a new portfolio based on the provided details",
  parameters: {
    type: Type.OBJECT,
    properties: {
      thumbnail: {
        type: Type.STRING,
        description: "an url or link of the portfolio thumbnail",
      },
      name: {
        type: Type.STRING,
        description: "name of the portfolio, capitalize",
      },
      status: {
        type: Type.STRING,
        description:
          "publish status of the portfolio, the values is between 'published' or 'draft'",
      },
      category: {
        type: Type.STRING,
        description: `category of the portfolio, the category that availables are ${PORTFOLIO_CATEGORIES.join(",")}`,
      },
      description: {
        type: Type.STRING,
        description: "description of the category",
      },
      demo_link: {
        type: Type.STRING,
        description:
          "url of the portfolio that has been published if the portfolios is web, mobile, desktop or multiplatform app",
      },
      repository_link: {
        type: Type.STRING,
        description: "github, gitlab, etc. link to the project repository",
      },
      tech_stacks: {
        type: Type.ARRAY,
        description: `list of techologies that used to build the project, tech stacks that avalaible are ${AVAILABLE_TECH_STACKS.join(",")}`,
        items: { type: Type.STRING },
      },
      createdAt: {
        type: Type.STRING,
        description: "the date of the item portfolio created in ISO format",
      },
      galery: {
        type: Type.ARRAY,
        description: "list of url for the portofolio galeries",
        items: { type: Type.STRING },
      },
    },
  },
};

export { createPortfolioFunction };
