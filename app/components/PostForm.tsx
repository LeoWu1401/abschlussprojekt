import type { Post } from "@/app/generated/prisma/client";
import Field from "@/app/components/Field";
import SelectField from "@/app/components/SelectField";
import { federalStates, postTypes } from "@/lib/labels";

type PostFormProps = {
  action: (formData: FormData) => Promise<void>;
  post?: Post;
};

export default function PostForm({ action, post }: PostFormProps) {
  return (
    <form action={action} className="mt-6 flex flex-col gap-4">
      {post && <input type="hidden" name="id" value={post.id} />}
      <Field label="Titel" name="title" required defaultValue={post?.title} />
      <SelectField
        label="Art"
        name="type"
        options={postTypes}
        defaultValue={post?.type}
      />
      <SelectField
        label="Bundesland"
        name="federalState"
        options={federalStates}
        defaultValue={post?.federalState}
      />
      <Field label="Stadt" name="city" required defaultValue={post?.city} />
      <Field
        label="Adresse (freiwillig)"
        name="address"
        defaultValue={post?.address || ""}
      />
      <Field
        label="Datum"
        name="date"
        type="date"
        required
        defaultValue={post?.date.toISOString().slice(0, 10)}
      />
      <label className="block">
        <span className="mb-1 block font-semibold">Beschreibung</span>
        <textarea
          name="description"
          rows={5}
          required
          defaultValue={post?.description}
          className="input"
        />
      </label>
      <Field
        label="Kontakt, zum Beispiel E-Mail oder WhatsApp-Link"
        name="contact"
        required
        defaultValue={post?.contact}
      />
      <button type="submit" className="btn-primary self-start">
        Speichern
      </button>
    </form>
  );
}