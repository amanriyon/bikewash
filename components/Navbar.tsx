import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/service-points", label: "Service Points" },
  { href: "/services", label: "Services" },
  { href: "/bikers", label: "Bikers" },
];

export default function Navbar() {
  return (
    <nav className="flex gap-6 border-b px-6 py-4">
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="hover:underline">
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
