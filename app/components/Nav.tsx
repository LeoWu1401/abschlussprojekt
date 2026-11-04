import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex gap-4 border-b p-4">
      <Link href="/board">Pinnwand</Link>
      <Link href="/posts/new">Neue Aktion</Link>
      <Link href="profile/1">Mein Profil</Link>
      <Link href="/">Abmelden</Link>
    </nav>
  );
}
