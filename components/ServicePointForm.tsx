"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { DAYS, type ServicePoint } from "@/lib/data";
import { geocode, type Place } from "@/lib/geocode";
import { addStored } from "@/lib/store";

const input =
  "w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 dark:border-white/25";

export default function ServicePointForm() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState<Place | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function findLocation(): Promise<Place | null> {
    if (!address.trim()) {
      setError("Enter an address first.");
      return null;
    }
    setBusy(true);
    setError("");
    try {
      const found = await geocode(address);
      if (!found) {
        setError("Address not found. Try adding the area or city.");
        return null;
      }
      setPlace(found);
      return found;
    } catch {
      setError("Could not look up the address. Check your internet and try again.");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const loc = place ?? (await findLocation());
    if (!loc) return;

    const point: ServicePoint = {
      id: Date.now(),
      name: String(fd.get("name")).trim(),
      phone: String(fd.get("phone")).trim(),
      address: address.trim(),
      lat: loc.lat,
      lon: loc.lon,
      bikesPerDay: Number(fd.get("bikesPerDay")),
      slotsPerDay: Number(fd.get("slotsPerDay")),
      offDays: fd.getAll("offDays").map(String),
    };
    addStored("bikewash_service_points", point);
    router.push("/service-points");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Service point name</span>
        <input name="name" required className={input} />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Phone</span>
        <input name="phone" type="tel" required className={input} />
      </label>

      <div>
        <label className="block">
          <span className="text-sm font-medium">Address</span>
          <input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setPlace(null);
            }}
            required
            className={input}
          />
        </label>
        <button
          type="button"
          onClick={findLocation}
          disabled={busy}
          className="mt-2 rounded-lg border border-black/20 px-3 py-1.5 text-sm hover:bg-black/5 disabled:opacity-50 dark:border-white/25 dark:hover:bg-white/10"
        >
          {busy ? "Searching..." : "Find location"}
        </button>
        {place && (
          <p className="mt-2 text-sm opacity-70">
            Lat: {place.lat.toFixed(5)}, Lon: {place.lon.toFixed(5)}
            <br />
            {place.label}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium">Bikes per day</span>
          <input name="bikesPerDay" type="number" min={1} required className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Slots per day</span>
          <input name="slotsPerDay" type="number" min={1} required className={input} />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-medium">Off days</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {DAYS.map((d) => (
            <label key={d} className="flex items-center gap-1.5 text-sm">
              <input type="checkbox" name="offDays" value={d} />
              {d}
            </label>
          ))}
        </div>
      </fieldset>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        Register Service Point
      </button>
    </form>
  );
}
