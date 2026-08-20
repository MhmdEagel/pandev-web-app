import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Lihat proyek dan karya terbaik yang telah dikerjakan oleh Arkana.",
};

export default function PortofolioPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        Portofolio
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Kumpulan proyek yang telah kami kerjakan untuk berbagai bisnis dan
        individu. Konten portofolio akan segera hadir.
      </p>
    </main>
  );
}