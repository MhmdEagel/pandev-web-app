"use client";

import { Suspense } from "react";
import { getPortfolios } from "@/app/actions/portfolio";
import { useQuery } from "@tanstack/react-query";
import PortfolioItem from "./_components/portfolio-item";
import PortfolioItemSkeleton from "./_components/portfolio-item-skeleton";
import { SearchBar } from "@/components/ui/searchfield";
import FilterPortfolio from "./_components/filter-portfolio";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function PortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const statusFilters = searchParams.get("status")?.split(",").filter(Boolean) || [];
  const categoryFilters = searchParams.get("category")?.split(",").filter(Boolean) || [];

  const { data: result, isLoading } = useQuery({
    queryKey: ["portfolios"],
    queryFn: getPortfolios,
  });

  const allPortfolios = result?.success && result.data ? result.data : [];

  const portfolios = allPortfolios.filter((portfolio) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const nameMatch = portfolio.name.toLowerCase().includes(query);
      const categoryMatch = portfolio.category.toLowerCase().includes(query);
      const techStacks = Array.isArray(portfolio.tech_stacks)
        ? (portfolio.tech_stacks as string[])
        : [];
      const techMatch = techStacks.some((tech) =>
        typeof tech === "string" && tech.toLowerCase().includes(query),
      );
      if (!nameMatch && !categoryMatch && !techMatch) return false;
    }

    // Status filter
    if (statusFilters.length > 0 && !statusFilters.includes(portfolio.status)) {
      return false;
    }

    // Category filter
    if (categoryFilters.length > 0 && !categoryFilters.includes(portfolio.category)) {
      return false;
    }

    return true;
  });

  const removeFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentValues = params.get(key)?.split(",").filter(Boolean) || [];
      const newValues = currentValues.filter((v) => v !== value);

      if (newValues.length > 0) {
        params.set(key, newValues.join(","));
      } else {
        params.delete(key);
      }

      params.delete("page");
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    params.delete("category");
    params.delete("search");
    params.delete("page");
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const hasActiveFilters = statusFilters.length > 0 || categoryFilters.length > 0 || !!searchQuery;

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

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <div className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">
              Pencarian: {searchQuery}
              <button
                onClick={() => removeFilter("search", searchQuery)}
                className="ml-1 hover:text-destructive"
              >
                <XIcon className="size-3" />
              </button>
            </div>
          )}
          {statusFilters.map((status) => (
            <div
              key={status}
              className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
            >
              Status: {status === "published" ? "Published" : "Draft"}
              <button
                onClick={() => removeFilter("status", status)}
                className="ml-1 hover:text-destructive"
              >
                <XIcon className="size-3" />
              </button>
            </div>
          ))}
          {categoryFilters.map((category) => (
            <div
              key={category}
              className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
            >
              Kategori: {category}
              <button
                onClick={() => removeFilter("category", category)}
                className="ml-1 hover:text-destructive"
              >
                <XIcon className="size-3" />
              </button>
            </div>
          ))}
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full text-destructive hover:bg-destructive/10"
          >
            Hapus Semua
          </button>
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {isLoading ? (
          <>
            <PortfolioItemSkeleton />
            <PortfolioItemSkeleton />
            <PortfolioItemSkeleton />
          </>
        ) : portfolios.length === 0 ? (
          <div className="flex items-center justify-around h-64 col-span-3 p-4 text-center text-muted-foreground">
            {hasActiveFilters
              ? "Tidak ada portfolio yang sesuai dengan filter."
              : "Anda belum menambahkan portfolio."}
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
    <Suspense fallback={<PortfolioLoadingSkeleton />}>
      <PortfolioContent />
    </Suspense>
  );
}
