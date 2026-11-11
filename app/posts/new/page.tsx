import Field from "@/app/components/Field";
import SelectField from "@/app/components/SelectField";
import { createPost } from "@/app/actions/posts";
import { federalStates, postTypes } from "@/lib/labels";
import { requireUser } from "@/lib/session";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireUser();
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-xl">
      <h1>Neue Aktion</h1>
      {error && (
        <p className="error mt-4">Bitte alle Pflichtfelder ausfüllen.</p>
      )}
      <form action={createPost} className="mt-6 flex flex-col gap-4">
        <Field label="Titel" name="title" required />
        <SelectField label="Art" name="type" options={postTypes} />
        <SelectField
          label="Bundesland"
          name="federalState"
          options={federalStates}
        />
        <Field label="Stadt" name="city" required />
        <Field label="Adresse (freiwillig)" name="address" />
        <Field label="Datum" name="date" type="date" required />
        <label className="block">
          <span className="mb-1 block font-semibold">Beschreibung</span>
          <textarea name="description" rows={5} required className="input" />
        </label>
        <Field
          label="Kontakt, zum Beispiel E-Mail oder WhatsApp-Link"
          name="contact"
          required
        />
        <button type="submit" className="btn-primary self-start">
          Speichern
        </button>
      </form>
    </div>
  );
}
