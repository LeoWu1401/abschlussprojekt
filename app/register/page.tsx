import Link from "next/link";
import Field from "../components/Field";
import { register } from "../actions/auth";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";


export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) {
    redirect("/board");
  }
  
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md">
      <h1>Registrieren</h1>
      {error === "invalid" && (
        <p className="error mt-4">
          Bitte alle Felder ausfüllen. Das Passwort braucht mindestens 8
          Zeichen.
        </p>
      )}
      {error === "taken" && (
        <p className="error mt-4">Diese E-Mail ist schon registriert.</p>
      )}
      <form action={register} className="mt-6 flex flex-col gap-4">
        <Field label="Name" name="name" required />
        <Field label="E-Mail" name="email" type="email" required />
        <Field
          label="Passwort (mindestens 8 Zeichen)"
          name="password"
          type="password"
          required
        />
        <button type="submit" className="btn-primary self-start">
          Registrieren
        </button>
      </form>
      <p className="mt-4">
        Schon ein Konto?{" "}
        <Link href="/login" className="font-semibold underline">
          Anmelden
        </Link>
      </p>
    </div>
  );
}
