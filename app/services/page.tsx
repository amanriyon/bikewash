import { services } from "@/lib/data";

export default function Services() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-bold">Services</h1>
      <p className="mt-2 opacity-70">Choose the wash your bike needs.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.id} className="rounded-xl border border-black/10 p-5 dark:border-white/15">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold">{s.name}</h2>
              <span className="font-semibold">Tk {s.price}</span>
            </div>
            <p className="mt-2 text-sm opacity-70">{s.desc}</p>
            <p className="mt-1 text-sm opacity-70">Time: {s.time}</p>
            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
