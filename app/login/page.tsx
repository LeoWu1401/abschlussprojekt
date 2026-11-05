import Link from "next/link";
import Field from "../components/Field";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1>Anmelden</h1>
      <form className="mt-6 flex flex-col gap-4">
        <Field label="E-Mail" name="email" type="email" />
        <Field label="Passwort" name="password" type="password" />
        <button type="button" className="btn-primary self-start">
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
