import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CreatePortfolioForm from "./_components/create-portfolio-form";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function CreatePortfolioPage() {
  return (
    <Card>
      <CardHeader>
        <Link className="mb-2" href={"/dashboard/portfolio"}>
          <Button className="w-fit" variant={"ghost"}>
            <ArrowLeftIcon /> Kembali
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Tambah Portfolio</h1>
        <p className="text-muted-foreground">
          Isi form dibawah ini untuk menambahkan portfolio
        </p>
      </CardHeader>
      <CardContent>
        <div>
          <CreatePortfolioForm />
        </div>
      </CardContent>
    </Card>
  );
}
