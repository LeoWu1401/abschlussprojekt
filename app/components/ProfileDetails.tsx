"use client"

import { useState } from "react";
import { updateProfile } from "@/app/actions/profile";
import Field from "@/app/components/Field";


type ProfileDetailsProps = {
  profile: {
    name: string;
    city: string | null;
    studio: string | null;
    tattooStyle: string | null;
    instagramUrl: string | null;
  };
  isOwner: boolean;
};

export default function ProfileDetails({
  profile,
  isOwner,
}: ProfileDetailsProps) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(formData: FormData) {
    const result = await updateProfile(formData);
    setError(result.error);

    if (!result.error) {
      setEditing(false);
    }
  }

  if (editing) {
    return (
      <form action={handleSave} className="flex max-w-xl flex-col gap-4">
        <h1>Profil bearbeiten</h1>
        {error && <p className="error">{error}</p>}
        <Field label="Name" name="name" required defaultValue={profile.name} />
        <Field label="Stadt" name="city" defaultValue={profile.city || ""} />
        <Field
          label="Studio"
          name="studio"
          defaultValue={profile.studio || ""}
        />
        <Field
          label="Stil"
          name="tattooStyle"
          defaultValue={profile.tattooStyle || ""}
        />
        <Field
          label="Instagram-Link"
          name="instagramUrl"
          type="url"
          defaultValue={profile.instagramUrl || ""}
        />
        <div className="flex gap-3">
          <button type="submit" className="btn-primary">
            Speichern
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="btn-secondary"
          >
            Abbrechen
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <h1>{profile.name}</h1>
      {profile.city && (
        <p>
          <strong>Stadt:</strong> {profile.city}
        </p>
      )}
      {profile.studio && (
        <p>
          <strong>Studio:</strong> {profile.studio}
        </p>
      )}
      {profile.tattooStyle && (
        <p>
          <strong>Stil:</strong> {profile.tattooStyle}
        </p>
      )}
      {profile.instagramUrl && (
        <p className="mt-2">
          <a
            href={profile.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline"
          >
            Instagram
          </a>
        </p>
      )}
      {isOwner && (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="btn-secondary mt-4"
        >
          Profil bearbeiten
        </button>
      )}
    </div>
  );
}
