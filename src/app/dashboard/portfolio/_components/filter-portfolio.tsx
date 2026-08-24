import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";

export default function FilterPortfolio() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <FilterIcon className="size-4" /> Filter
        </Button>
      </SheetTrigger>
      <SheetContent >
        <SheetHeader>
          <SheetTitle>Filter Portfolio</SheetTitle>
          <SheetDescription>Pilih item-item di bawah ini untuk mengfilter portfolio Anda.</SheetDescription>
        </SheetHeader>
        <div></div>
      </SheetContent>
    </Sheet>
  );
}
