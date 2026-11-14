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
      {isOwner && <p className="mt-4 text-sm opacity-70">Das ist dein Profil.</p>}
    </div>
  );
}
