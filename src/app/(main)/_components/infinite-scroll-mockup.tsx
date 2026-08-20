import { cn } from "@/lib/utils";

type MarqueeRow = {
  items: readonly string[];
  reverse?: boolean;
};

const ROWS: readonly MarqueeRow[] = [
  {
    items: ["Web & Mobile App", "Desktop App"],
  },
  {
    items: ["Cyber Security", "IoT Solutions"],
    reverse: true,
  },
  {
    items: ["Data & GIS", "Project Support"],
  },
] as const;

function MarqueeSequence({ items }: { items: readonly string[] }) {
  const sequence = [...items, ...items, ...items];

  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16"
      aria-hidden="true"
    >
      {sequence.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={cn(
            "text-3xl font-bold tracking-tight uppercase sm:text-4xl lg:text-5xl",
            index % 2 === 0
              ? "text-foreground"
              : "text-transparent [-webkit-text-stroke:1px_var(--foreground)]"
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function MarqueeRow({ row }: { row: (typeof ROWS)[number] }) {
  return (
    <div className="flex overflow-hidden" aria-hidden="true">
      <div
        className={cn(
          "flex shrink-0 motion-reduce:animate-none",
          row.reverse ? "animate-scroll-right" : "animate-scroll-left"
        )}
      >
        <MarqueeSequence items={row.items} />
        <MarqueeSequence items={row.items} />
      </div>
    </div>
  );
}

export default function InfiniteScrollMockup() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8" aria-hidden="true">
      {ROWS.map((row, index) => (
        <MarqueeRow key={index} row={row} />
      ))}
    </div>
  );
}