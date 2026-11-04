import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Ink-Board</h1>
      <p>Die Pinnwand für gemeinsame Aktionen von Tattoo-Artists.</p>
      <p>
        <Link href="/login">Anmelden</Link> · <Link href="/register">Registrieren</Link>
        </p>
    </div>
  )
}