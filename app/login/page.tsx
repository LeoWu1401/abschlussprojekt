import Link from "next/link";
import Field from "../components/Field";
import { login } from "../actions/auth";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function LoginPage({
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
      <h1>Anmelden</h1>
      {error && (
        <p className="error mt-4">E-Mail oder Passwort stimmt nicht.</p>
      )}
      <form action={login} className="mt-6 flex flex-col gap-4">
        <Field label="E-Mail" name="email" type="email" required />
        <Field label="Passwort" name="password" type="password" required />
        <button type="submit" className="btn-primary self-start">
          Anmelden
        </button>
      </form>
      <p className="mt-4">
        Noch kein Konto?{" "}
        <Link href="/register" className="font-semibold underline">
          Registrieren
        </Link>
      </p>
    </div>
  );
}
  
