import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "../../data/posts";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Link href="/board" className="text-sm opacity-70">
        « Zurück zur Pinnwand
      </Link>
      <h1 className="mt-4">{post.title}</h1>
      <p>
        <strong>Art:</strong> {post.type}
      </p>
      <p>
        <strong>Datum:</strong> {post.date}
      </p>
      <p>
        <strong>Bundesland:</strong> {post.federalState}
      </p>
      <p>
        <strong>Stadt:</strong> {post.city}
      </p>
      <p className="mt-4 max-w-xl">{post.description}</p>
      <p className="mt-4">
        von{" "}
        <Link href="/profile/1" className="font-semibold underline">
          {post.user.name}
        </Link>
      </p>
      <div className="mt-6">
        <Link href={`/posts/${post.id}/edit`} className="btn-secondary">
          Bearbeiten
        </Link>
      </div>
    </div>
  );
}