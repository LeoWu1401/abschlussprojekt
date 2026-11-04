import Link from "next/link";

export default function BoardPage() {
  return (
    <div>
      <h1>Pinnwand</h1>
      <p>Hier kommen die Karten mit den Aktionen hin.</p>
      <Link href="/posts/1">Beispiel-Aktion ansehen</Link>
    </div>
  );
}