"use client";

import { useState } from "react";
import ServicePointMap from "@/components/ServicePointMap";
import { servicePoints as seed, type ServicePoint } from "@/lib/data";
import { useStored } from "@/lib/store";

export default function ServicePointsView() {
  const points = useStored<ServicePoint>("bikewash_service_points", seed);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr]">
      <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
        {points.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className={`w-full rounded-xl border p-4 text-left ${
              selectedId === p.id
                ? "border-blue-600 ring-2 ring-blue-600/30"
                : "border-black/10 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
            }`}
          >
            <h2 className="font-semibold">{p.name}</h2>
            <p className="mt-1 text-sm opacity-70">{p.address}</p>
            <p className="mt-2 text-sm">
              {p.bikesPerDay} bikes/day · {p.slotsPerDay} slots/day
            </p>
            <p className="mt-1 text-sm opacity-70">
              Off: {p.offDays.length ? p.offDays.join(", ") : "None"}
            </p>
          </button>
        ))}
      </div>

      <div className="isolate overflow-hidden rounded-xl border border-black/10 dark:border-white/15">
        <ServicePointMap points={points} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
    </div>
  );
}
