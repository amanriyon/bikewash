"use client";

import { useMemo, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

// Returns seed items plus items saved in this browser.
export function useStored<T>(key: string, seed: T[]): T[] {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) ?? "",
    () => ""
  );
  return useMemo(() => {
    try {
      return [...seed, ...(raw ? (JSON.parse(raw) as T[]) : [])];
    } catch {
      return seed;
    }
  }, [raw, seed]);
}

export function addStored<T>(key: string, item: T) {
  let current: T[] = [];
  try {
    current = JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    current = [];
  }
  localStorage.setItem(key, JSON.stringify([...current, item]));
  listeners.forEach((l) => l());
}
