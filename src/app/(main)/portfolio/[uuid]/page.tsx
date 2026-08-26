"use client";

import { getPortfolioByUuid } from "@/app/actions/portfolio";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import PortfolioDetail from "../_components/portfolio-detail";
import PortfolioDetailSkeleton from "../_components/portfolio-detail-skeleton";
import CtaSection from "../../_components/cta-section";

export default function PortfolioDetailPage() {
  const params = useParams();
  const uuid = params.uuid as string;

  const { data: result, isLoading } = useQuery({
    queryKey: ["portfolio", uuid],
    queryFn: () => getPortfolioByUuid(uuid),
    enabled: !!uuid,
  });

  const portfolio = result?.success ? result.data : null;

  if (isLoading) {
    return <PortfolioDetailSkeleton />;
  }

  if (!portfolio) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Portofolio Tidak Ditemukan</h1>
          <p className="mt-2 text-muted-foreground">
            Portofolio yang Anda cari tidak tersedia.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="p-4">
        <div className="text-xl font-bold uppercase text-primary md:text-4xl">
          Portfolio Detail
        </div>
        <PortfolioDetail portfolio={portfolio} />
      </div>
      <CtaSection />
    </div>
  );
}
