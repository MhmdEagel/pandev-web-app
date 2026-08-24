"use client";

import { getPortfolios } from "@/app/actions/portfolio";
import { useQuery } from "@tanstack/react-query";
import PortfolioItem from "./_components/portfolio-item";
import PortfolioItemSkeleton from "./_components/portfolio-item-skeleton";
import { SearchBar } from "@/components/ui/searchfield";
import FilterPortfolio from "./_components/filter-portfolio";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function PortfolioPage() {
  const { data: result, isLoading } = useQuery({
    queryKey: ["portfolios"],
    queryFn: getPortfolios,
  });

  const portfolios = result?.success && result.data ? result.data : [];

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b">
        <div className="text-xl font-bold">Portfolio</div>
        <div>Kelola portfolio yang ingin Anda ditampilkan</div>
      </div>
      <div className="flex gap-1">
        <SearchBar placeholder="Cari portfolio..." />
        <FilterPortfolio />
        <Link href={"/dashboard/portfolio/create"}>
          <Button type="button">
            <PlusIcon className="size-4" />
            Tambah
          </Button>
        </Link>
      </div>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {isLoading ? (
          <>
            <PortfolioItemSkeleton />
            <PortfolioItemSkeleton />
            <PortfolioItemSkeleton />
          </>
        ) : portfolios.length === 0 ? (
          <div className="col-span-3 text-center text-muted-foreground">
            Belum ada portfolio
          </div>
        ) : (
          portfolios.map((portfolio) => (
            <PortfolioItem key={portfolio.id} {...portfolio} />
          ))
        )}
      </section>
    </div>
  );
}
