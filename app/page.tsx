import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/board");
  }
  
  return (
    <div className="py-12 text-center">
      <h1 className="text-6xl">Ink-Board</h1>
      <p className="mt-6 text-xl">
        Die Pinnwand für gemeinsame Aktionen von Tattoo-Artists.
      </p>
      <p className="mx-auto mt-4 max-w-md opacity-70">
        Flash Days, Guest Spots, Conventions: Finde Artists in deiner Nähe, die
        mitmachen.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/register" className="btn-primary">
          Registrieren
        </Link>
        <Link href="/login" className="btn-secondary">
          Anmelden
        </Link>
      </div>
      <p className="mt-6 text-sm">Nur für Tattoo-Artists, keine Kunden.</p>
    </div>
  );
}