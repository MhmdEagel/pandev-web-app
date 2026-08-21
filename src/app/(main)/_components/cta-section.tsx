import { Button } from "@/components/ui/button";
import { MoveUpRightIcon } from "lucide-react";

export default function CtaSection() {
  return (
    <section
      id="cta-section"
      className="mt-16 relative w-full py-24 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/assets/grid-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/90" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl font-bold md:text-5xl leading-tight">
          Siap membangun sesuatu yang berdampak?
        </h2>
        <p className="mt-4 textforeground text-lg">
          Langkah pertama Anda dimulai dari sini.
        </p>
        <Button
        size={"lg"}
          className="mt-8 bg-white text-black hover:bg-white/90 text-xl px-8 h-12"
        >
          Let&apos;s Talk <MoveUpRightIcon />
        </Button>
      </div>
    </section>
  );
}
