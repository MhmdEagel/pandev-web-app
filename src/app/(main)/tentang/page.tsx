import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Kenali lebih dekat Arkana, software house di Indonesia yang fokus pada solusi teknologi.",
};

export default function TentangPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        Tentang Kami
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Arkana adalah software house di Indonesia yang menawarkan solusi aplikasi
        untuk bisnis dan individu. Kami membantu mewujudkan ide menjadi produk
        digital yang bermanfaat dan berkelanjutan.
      </p>
    </main>
  );
}