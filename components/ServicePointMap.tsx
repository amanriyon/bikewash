"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, CircleMarker } from "leaflet";
import type { ServicePoint } from "@/lib/data";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function popupHtml(p: ServicePoint) {
  const off = p.offDays.length ? p.offDays.join(", ") : "None";
  return `<div style="min-width:180px;line-height:1.6">
    <strong>${esc(p.name)}</strong><br/>
    ${esc(p.address)}<br/>
    ${p.phone ? esc(p.phone) + "<br/>" : ""}
    Bikes per day: <b>${p.bikesPerDay}</b><br/>
    Slots per day: <b>${p.slotsPerDay}</b><br/>
    Off days: <b>${esc(off)}</b>
  </div>`;
}

type Props = {
  points: ServicePoint[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export default function ServicePointMap({ points, selectedId, onSelect }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef(new Map<number, CircleMarker>());
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  });

  useEffect(() => {
    let cancelled = false;
    let instance: LeafletMap | undefined;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !box.current) return;

      const m0 = L.map(box.current).setView([23.8103, 90.4125], 11);
      instance = m0;
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(m0);

      markers.current.clear();
      points.forEach((p) => {
        const marker = L.circleMarker([p.lat, p.lon], {
          radius: 11,
          color: "#1d4ed8",
          weight: 2,
          fillColor: "#3b82f6",
          fillOpacity: 0.85,
        })
          .addTo(m0)
          .bindPopup(popupHtml(p));
        marker.on("click", () => onSelectRef.current(p.id));
        markers.current.set(p.id, marker);
      });

      if (points.length > 1) {
        const bounds = L.latLngBounds(
          points.map((p) => [p.lat, p.lon] as [number, number])
        );
        m0.fitBounds(bounds.pad(0.2));
      } else if (points.length === 1) {
        m0.setView([points[0].lat, points[0].lon], 14);
      }
      map.current = m0;
    })();

    return () => {
      cancelled = true;
      instance?.remove();
      map.current = null;
    };
  }, [points]);

  useEffect(() => {
    if (selectedId == null || !map.current) return;
    const marker = markers.current.get(selectedId);
    if (!marker) return;
    map.current.flyTo(marker.getLatLng(), Math.max(map.current.getZoom(), 14));
    marker.openPopup();
  }, [selectedId]);

  return <div ref={box} className="h-[70vh] w-full" />;
}
