import type { Metadata } from "next";
import Image from "next/image";
import Carousel from "./_components/carousel";
import { Button } from "@/components/ui/button";
import { MoveUpRightIcon } from "lucide-react";
import CtaSection from "../_components/cta-section";

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Lihat proyek dan karya terbaik yang telah dikerjakan oleh PanDev.",
};

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Proyek Web Application",
    image: "/assets/hero-image.svg",
  },
  {
    id: 2,
    title: "Proyek Mobile App",
    image: "/assets/hero-image.svg",
  },
  {
    id: 3,
    title: "Proyek IoT",
    image: "/assets/hero-image.svg",
  },
  {
    id: 4,
    title: "Proyek Data Analytics",
    image: "/assets/hero-image.svg",
  },
  {
    id: 5,
    title: "Proyek Cyber Security",
    image: "/assets/hero-image.svg",
  },
];

export default function PortofolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 space-y-4">
        <section className="flex w-full flex-1 flex-col py-16 items-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl uppercase text-center text-primary">
            Project showcase
          </h1>
          <Carousel />
          <p className="mt-4 text-muted-foreground text-center text-base lg:text-xl max-w-4xl">
            Kumpulan proyek aplikasi dalam bentuk website, mobile, dan desktop
            serta design yang telah kami kerjakan dan bangun
          </p>
          <Button className="mt-4 h-14 rounded-2xl px-4">
            Lihat Selengkapnya <MoveUpRightIcon />
          </Button>
        </section>

        <section className="px-4 space-y-8">
          <div className="text-4xl text-primary font-bold">
            FEATURED PROJECTS
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {FEATURED_PROJECTS.slice(0, 2).map((project) => (
              <div
                key={project.id}
                className="group relative aspect-video overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {FEATURED_PROJECTS.slice(2).map((project) => (
              <div
                key={project.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CtaSection />
      </main>
    </div>
  );
}
