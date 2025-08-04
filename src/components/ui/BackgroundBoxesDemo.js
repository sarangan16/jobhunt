"use client";
import { Boxes } from "../ui/background-boxes";
import { cn } from "../lib/utils";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-96 relative font-mono w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
      <div className="absolute inset-0 w-full h-full bg-slate-900 flex flex-col items-center justify-center overflow-hidden" />
      <Boxes />
      <h1 className={cn("md:text-6xl text-4xl text-white relative z-20")}>
        JobHunt Job Finding Portal
      </h1>
    </div>
  );
}
