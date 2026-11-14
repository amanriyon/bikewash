import { servicePoints } from "@/lib/data";

export default function ServicePoints() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-bold">Service Points</h1>
      <p className="mt-2 opacity-70">Find a wash point near you.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servicePoints.map((p) => (
          <div key={p.id} className="rounded-xl border border-black/10 p-5 dark:border-white/15">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold">{p.name}</h2>
              <span
                className={
                  p.open
                    ? "rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-medium text-green-600"
                    : "rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-medium text-red-600"
                }
              >
                {p.open ? "Open" : "Closed"}
              </span>
            </div>
            <p className="mt-2 text-sm opacity-70">{p.address}</p>
            <p className="mt-1 text-sm opacity-70">{p.hours}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
