import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { federalStates, postTypes } from "@/lib/labels";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/session";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();

  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId)) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { user: { select: { name: true } } },
  });

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
        <strong>Art:</strong> {postTypes[post.type]}
      </p>
      <p>
        <strong>Datum:</strong> {formatDate(post.date)}
      </p>
      <p>
        <strong>Bundesland:</strong> {federalStates[post.federalState]}
      </p>
      <p>
        <strong>Stadt:</strong> {post.city}
      </p>
      {post.address && (
        <p>
          <strong>Adresse:</strong> {post.address}
        </p>
      )}
      <p className="mt-4 max-w-xl">{post.description}</p>
      <p className="mt-4">
        <strong>Kontakt:</strong> {post.contact}
      </p>
      <p className="mt-4">
        von{" "}
        <Link
          href={`/profile/${post.userId}`}
          className="font-semibold underline"
        >
          {post.user.name}
        </Link>
      </p>
      {post.userId === user.id && (
        <div className="mt-6">
          <Link href={`/posts/${post.id}/edit`} className="btn-secondary">
            Bearbeiten
          </Link>
        </div>
      )}
    </div>
  );
}