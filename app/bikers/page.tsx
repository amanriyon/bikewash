import Link from "next/link";
import BikerList from "@/components/BikerList";

export default function Bikers() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Bikers</h1>
          <p className="mt-2 opacity-70">Meet the people who wash your bike.</p>
        </div>
        <Link
          href="/bikers/register"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Register as Biker
        </Link>
      </div>
      <BikerList />
    </main>
  );
}
