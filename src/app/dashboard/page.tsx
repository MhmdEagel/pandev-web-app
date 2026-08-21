export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Selamat datang di dashboard PanDev.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground">Total Proyek</div>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground">Proyek Aktif</div>
          <div className="text-2xl font-bold">5</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground">Selesai</div>
          <div className="text-2xl font-bold">7</div>
        </div>
      </div>
    </div>
  );
}
