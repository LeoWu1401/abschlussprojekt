"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../actions/auth";

type NavProps = {
  user: { id: number; name: string } | null;
};

export default function Nav({ user }: NavProps) {
  const pathname = usePathname();

  const links = user
    ? [
        { href: "/board", label: "Pinnwand" },
        { href: "/posts/new", label: "Neue Aktion" },
        { href: `/profile/${user.id}`, label: "Mein Profil" },
      ]
    : [
        { href: "/login", label: "Anmelden" },
        { href: "/register", label: "Registrieren" },
      ];

  return (
    <nav className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b-2 px-6 py-4">
      <Link href="/" className="font-display text-xl">
        Ink-Board
      </Link>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href
                ? "font-bold underline underline-offset-4"
                : ""
            }
          >
            {link.label}
          </Link>
        ))}
        {user && (
          <form action={logout}>
            <button type="submit" className="btn-secondary px-3 py-1 text-sm">
              Abmelden
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
