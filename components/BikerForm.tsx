"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { Biker } from "@/lib/data";
import { addStored } from "@/lib/store";

const input =
  "w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 dark:border-white/25";

export default function BikerForm() {
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const biker: Biker = {
      id: Date.now(),
      name: String(fd.get("name")).trim(),
      phone: String(fd.get("phone")).trim(),
      area: String(fd.get("area")).trim(),
      vehicle: String(fd.get("vehicle")).trim(),
      rating: 0,
      jobs: 0,
      available: true,
    };
    addStored("bikewash_bikers", biker);
    router.push("/bikers");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Full name</span>
        <input name="name" required className={input} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Phone</span>
        <input name="phone" type="tel" required className={input} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Area</span>
        <input name="area" required className={input} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Bike model / number</span>
        <input name="vehicle" required className={input} />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
      >
        Register Biker
      </button>
    </form>
  );
}
