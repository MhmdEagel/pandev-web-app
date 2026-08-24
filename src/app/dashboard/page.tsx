import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="italic text-muted-foreground">Dream big, work hard, stay focused.</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent>
            <div className="text-sm uppercase">Total Proyek</div>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-sm uppercase">Proyek Aktif</div>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-sm uppercase">Selesai</div>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
