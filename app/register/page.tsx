import Link from "next/link";
import Field from "../components/Field";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1>Registrieren</h1>
      <form className="mt-6 flex flex-col gap-4">
        <Field label="Name" name="name" />
        <Field label="E-Mail" name="email" type="email" />
        <Field label="Passwort" name="password" type="password" />
        <button type="button" className="btn-primary self-start">
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
