import Link from "next/link";
import { services } from "@/lib/data";

const steps = [
  { title: "Choose a service", text: "Pick the wash that fits your bike." },
  { title: "Pick a service point", text: "Find the nearest open point." },
  { title: "Get it done", text: "A biker washes it, you ride away clean." },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Clean bike, every ride.</h1>
        <p className="mx-auto mt-4 max-w-xl opacity-70">
          Book a bike wash at a service point near you, done by trusted bikers.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/services"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
          >
            View Services
          </Link>
          <Link
            href="/service-points"
            className="rounded-lg border border-black/20 px-5 py-2.5 hover:bg-black/5 dark:border-white/25 dark:hover:bg-white/10"
          >
            Find a Point
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-black/10 p-5 dark:border-white/15">
              <div className="text-sm font-semibold opacity-60">Step {i + 1}</div>
              <h3 className="mt-1 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm opacity-70">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Popular services</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {services.slice(0, 3).map((s) => (
            <div key={s.id} className="rounded-xl border border-black/10 p-5 dark:border-white/15">
              <h3 className="font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm opacity-70">{s.desc}</p>
              <p className="mt-3 font-semibold">Tk {s.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
