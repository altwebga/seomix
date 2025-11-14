import { GridPattern } from "../ui/grid-pattern";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <div className="relative flex h-[80vh] w-full flex-col justify-center overflow-hidden">
      <GridPattern
        width={120}
        height={120}
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "mask-x-from-70% mask-x-to-90%",
          "inset-x-0 inset-y-[-30%] h-[200%] -skew-y-8"
        )}
      />
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="flex flex-col gap-2 ">
          Разработка и продвижение сайтов{" "}
          <span className="text-[clamp(40px,5vw,80px)] text-red-500">
            в Краснодаре
          </span>
        </h1>
      </div>
    </div>
  );
}
