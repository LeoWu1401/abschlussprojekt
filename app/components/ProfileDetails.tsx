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
      <div className="facts mt-6 max-w-md">
        {profile.city && (
          <p className="fact">
            <span className="icon icon-pin" aria-hidden="true" />
            <span>
              <small>Stadt</small>
              {profile.city}
            </span>
          </p>
        )}
        {profile.studio && (
          <p className="fact">
            <span className="icon icon-machine" aria-hidden="true" />
            <span>
              <small>Studio</small>
              {profile.studio}
            </span>
          </p>
        )}
        {profile.tattooStyle && (
          <p className="fact">
            <span className="icon icon-bottle" aria-hidden="true" />
            <span>
              <small>Stil</small>
              {profile.tattooStyle}
            </span>
          </p>
        )}
        {profile.instagramUrl && (
          <p className="fact">
            <span className="icon icon-instagram" aria-hidden="true" />
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
        {!profile.city &&
          !profile.studio &&
          !profile.tattooStyle &&
          !profile.instagramUrl && <p>Noch keine Angaben.</p>}
      </div>
      {isOwner && (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="btn-secondary mt-6"
        >
          Profil bearbeiten
        </button>
      )}
    </div>
  );
      
}
