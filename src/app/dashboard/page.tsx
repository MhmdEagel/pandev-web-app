import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import DashboardHeader from "./_components/dashboard-header";
import { FolderIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const totalPortfolios = await prisma.portfolio.count();

  return (
    <div className="space-y-4">
      <DashboardHeader title="Dashboard" description="Kelola portfolio yang ingin Anda tampilkan" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <FolderIcon className="size-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground uppercase">Total Projek Diunggah</div>
              <div className="text-2xl font-bold">{totalPortfolios}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
