"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CircleDotIcon,
  CircleIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  PenIcon,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import { Portfolio } from "../_types/portfolio";

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Baru saja";
  if (diffInSeconds < 3600) return `Diupdate ${Math.floor(diffInSeconds / 60)} menit yang lalu`;
  if (diffInSeconds < 86400) return `Diupdate ${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
  if (diffInSeconds < 604800) return `Diupdate ${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
  if (diffInSeconds < 2592000) return `Diupdate ${Math.floor(diffInSeconds / 604800)} minggu yang lalu`;
  if (diffInSeconds < 31536000) return `Diupdate ${Math.floor(diffInSeconds / 2592000)} bulan yang lalu`;
  return `Diupdate ${Math.floor(diffInSeconds / 31536000)} tahun yang lalu`;
}

type PropTypes = Portfolio;

export default function PortfolioItem(props: PropTypes) {
  const { thumbnail, name, category, status, updated_at } = props;
  return (
    <Card className="hover:scale-[102%] transition-all">
      <CardHeader>
        <div className="object-cover aspect-video">
          <Image
            className="w-full rounded-tl-lg rounded-tr-lg"
            src={thumbnail}
            width={300}
            height={300}
            alt={name}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 font-semibold border-b">
            <div className="truncate">{name}</div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                  <EllipsisVerticalIcon className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <Button
                  className="flex justify-start gap-1"
                  type="button"
                  variant={"ghost"}
                >
                  <PenIcon className="size-4" /> Edit
                </Button>
                <Button
                  className="flex justify-start gap-1"
                  type="button"
                  variant={"ghost"}
                >
                  <TrashIcon className="size-4" /> Delete
                </Button>
                <Button
                  className="flex justify-start gap-1"
                  type="button"
                  variant={"ghost"}
                >
                  <ExternalLinkIcon className="size-4" />
                  Preview
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="size-4" />{" "}
            <span className="text-sm">
              {getRelativeTime(new Date(updated_at))}
            </span>
          </div>
          <div className="space-y-1">
            <div className="uppercase text-muted-foreground ">Status & Category</div>
            <div className="flex gap-1">
              {status === "published" ? (
                <div className="flex items-center gap-1 p-1 text-sm text-green-800 bg-green-200 border rounded-lg w-fit">
                  <CircleDotIcon className="size-4" /> Published
                </div>
              ) : (
                <div className="flex items-center gap-1 p-1 text-sm border rounded-lg text-amber-800 bg-amber-200 w-fit">
                  <CircleIcon className="size-4" /> Draft
                </div>
              )}
              <div className="px-2 py-1 text-sm border rounded-lg w-fit bg-cyan-200 text-cyan-800">
                {category}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="uppercase text-muted-foreground ">Tech Stacks</div>
            <div className="flex gap-1">
              <div className="px-2 py-1 text-sm border rounded-lg w-fit bg-slate-200 text-slate-800">
                Nextjs
              </div>
              <div className="px-2 py-1 text-sm border rounded-lg w-fit bg-slate-200 text-slate-800">
                MySQL
              </div>
              <div className="px-2 py-1 text-sm border rounded-lg w-fit bg-slate-200 text-slate-800">
                Tailwind
              </div>
              <div className="px-2 py-1 text-sm border rounded-lg w-fit text-slate-800">
                +5
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
