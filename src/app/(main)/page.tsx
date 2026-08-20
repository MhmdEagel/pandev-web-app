import Image from "next/image";

import InfiniteScrollMockup from "./_components/infinite-scroll-mockup";

export default function Home() {
  return (
    <div>
      <main>
        <div className="text-center min-h-screen pt-14">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">ARKANA</h1>
          <div className="text-lg md:text-2xl lg:text-4xl mt-1">
            Unlock What&apos;s Possible
          </div>
          <div className="italic text-base md:text-xl lg:text-2xl mt-4 tracking-wider">
            Digital solutions, where ideas becomes reality
          </div>
          <div className="relative mt-4">
            <div className="relative z-10">
              <Image
                className="mx-auto"
                width={700}
                height={600}
                src={"/assets/new-hero-image.png"}
                alt="Hero Image"
              />
            </div>
            <div className="absolute top-30 left-0 right-0 z-0">
              <InfiniteScrollMockup />
            </div>
            {/* ===== Infinite Scroll Mockup ====== */}
          </div>
        </div>
      </main>
    </div>
  );
}
