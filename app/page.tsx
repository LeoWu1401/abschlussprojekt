import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/board");
  }

  return (
    <div className="relative flex min-h-[78vh] flex-col items-center justify-center text-center">
      <div className="stencil-art -inset-y-8" aria-hidden="true" />
      <h1 className="text-6xl md:text-8xl">Ink-Board</h1>
      <p className="mt-6 text-xl font-medium md:text-3xl">
        Die Pinnwand für gemeinsame Aktionen von Tattoo-Artists.
      </p>
      <p className="mx-auto mt-4 max-w-xl font-medium md:text-xl">
        Flash Days, Guest Spots, Conventions: Finde Artists in deiner Nähe, die
        mitmachen.
      </p>
      <div className="mt-10 flex justify-center gap-4 md:text-lg">
        <Link href="/register" className="btn-primary">
          Registrieren
        </Link>
        <Link href="/login" className="btn-secondary">
          Anmelden
        </Link>
      </div>
      <p className="mt-6 text-sm md:text-base">
        Nur für Tattoo-Artists, keine Kunden.
      </p>
    </div>
  );
}
