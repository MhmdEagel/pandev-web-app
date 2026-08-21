import Image from "next/image";
import InfiniteScrollMarquee from "./infinite-scroll-marquee";

export default function HeroSection() {
  return (
    <section className="text-center  mt-16">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">PANDEV</h1>
      <div className="text-lg md:text-2xl lg:text-4xl mt-1">
        Unlock What&apos;s Possible
      </div>
      <div className="italic text-base md:text-xl lg:text-2xl mt-4 tracking-wider">
        Digital solutions, where ideas becomes reality
      </div>
      <div className="mt-4">
        <div className="relative z-10">
          <Image
            className="mx-auto w-auto h-auto"
            width={800}
            height={600}
            src={"/assets/hero-image.svg"}
            alt="Hero Image"
          />
          <div className="md:block hidden">
            <InfiniteScrollMarquee />
          </div>
        </div>
        {/* ===== Infinite Scroll Mockup ====== */}
      </div>
    </section>
  );
}
