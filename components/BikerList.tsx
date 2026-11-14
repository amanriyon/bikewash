"use client";

import { bikers as seed, type Biker } from "@/lib/data";
import { useStored } from "@/lib/store";

export default function BikerList() {
  const bikers = useStored<Biker>("bikewash_bikers", seed);

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bikers.map((b) => (
        <div key={b.id} className="rounded-xl border border-black/10 p-5 dark:border-white/15">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              {b.name[0]}
            </div>
            <div>
              <h2 className="font-semibold">{b.name}</h2>
              <p className="text-sm opacity-70">{b.area}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span>{b.rating ? `★ ${b.rating}` : "New"}</span>
            <span className="opacity-70">{b.jobs} jobs</span>
            <span
              className={
                b.available
                  ? "rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-medium text-green-600"
                  : "rounded-full bg-gray-500/15 px-2.5 py-0.5 text-xs font-medium opacity-70"
              }
            >
              {b.available ? "Available" : "Busy"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
