import { Card, CardContent } from "@/components/ui/card";
import DashboardHeader from "./_components/dashboard-header";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <DashboardHeader title="Dashboard" description="Kelola portfolio yang ingin Anda tampilkan" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent>
            <div className="text-sm uppercase">Total Projek Diunggah</div>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
