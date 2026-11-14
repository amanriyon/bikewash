export type Place = { lat: number; lon: number; label: string };

// Address -> latitude/longitude using OpenStreetMap Nominatim.
export async function geocode(address: string): Promise<Place | null> {
  const url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
    encodeURIComponent(address);
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("Geocoding failed");
  const data: { lat: string; lon: string; display_name: string }[] = await res.json();
  if (data.length === 0) return null;
  return {
    lat: Number(data[0].lat),
    lon: Number(data[0].lon),
    label: data[0].display_name,
  };
}
