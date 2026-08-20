import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi tim Arkana untuk konsultasi dan mulai proyek Anda bersama kami.",
};

export default function KontakPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        Kontak
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Siap memulai proyek bersama Arkana? Hubungi kami dan konsultasikan
        kebutuhan Anda. Formulir kontak akan segera hadir.
      </p>
    </main>
  );
}