import Link from "next/link";

export default function PostPage() {
  return (
    <div>
      <h1>Aktion ansehen</h1>
      <p>Hier stehen bald Titel, Art, Bundesland, Stadt, Datum und Beschreibung.</p>
      <div className="flex gap-4">
        <Link href="/profile/1">Profil des Artists</Link>
        <Link href="/posts/1/edit">Bearbeiten</Link>
      </div>
    </div>
  )
}