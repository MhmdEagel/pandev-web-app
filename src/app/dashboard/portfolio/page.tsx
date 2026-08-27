"use client";

import { Suspense } from "react";
import PortfolioContent from "./_components/portfolio-content";
import PortfolioItemSkeleton from "./_components/portfolio-item-skeleton";

function PortfolioLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="pb-2 border-b">
        <div className="text-xl font-bold">Portfolio</div>
        <div>Kelola portfolio yang ingin Anda ditampilkan</div>
      </div>
      <div className="flex gap-1">
        <div className="h-10 w-64 bg-muted animate-pulse rounded-md" />
        <div className="h-10 w-20 bg-muted animate-pulse rounded-md" />
        <div className="h-10 w-24 bg-muted animate-pulse rounded-md" />
      </div>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PortfolioItemSkeleton />
        <PortfolioItemSkeleton />
        <PortfolioItemSkeleton />
      </section>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="space-y-4">
      <div className="pb-2 border-b">
        <div className="text-xl font-bold">Portfolio</div>
        <div>Kelola portfolio yang ingin Anda ditampilkan</div>
      </div>
      <Suspense fallback={<PortfolioLoadingSkeleton />}>
        <PortfolioContent />
      </Suspense>
    </div>
  );
}
