import Link from "next/link";
import ServicePointsView from "@/components/ServicePointsView";

export default function ServicePoints() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Service Points</h1>
          <p className="mt-2 opacity-70">Click a point or a bubble on the map for details.</p>
        </div>
        <Link
          href="/service-points/register"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Register Service Point
        </Link>
      </div>
      <ServicePointsView />
    </main>
  );
}
