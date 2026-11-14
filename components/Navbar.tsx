"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/service-points", label: "Service Points" },
  { href: "/services", label: "Services" },
  { href: "/bikers", label: "Bikers" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-background/90 backdrop-blur dark:border-white/15">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          BikeWash
        </Link>
        <div className="flex gap-5 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                pathname === l.href
                  ? "font-semibold underline underline-offset-4"
                  : "opacity-70 hover:opacity-100"
              }
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
