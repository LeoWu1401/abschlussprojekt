import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { federalStates, postTypes } from "@/lib/labels";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/session";
import DeleteButton from "@/app/components/DeleteButton";
import { getContactHref } from "@/lib/contact";


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

  const contactHref = getContactHref(post.contact, post.title);
  const mapsHref = post.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${post.address}, ${post.city}`,
      )}`
    : null;

  return (
    <div className={`type-${post.type}`}>
      <Link href="/board" className="text-sm opacity-70">
        « Zurück zur Pinnwand
      </Link>
      <div className="mt-6 grid gap-8 md:grid-cols-[3fr_2fr]">
        <div>
          <span className="badge">
            <span className="type-icon" aria-hidden="true" />
            {postTypes[post.type]}
          </span>
          <h1 className="mt-4">{post.title}</h1>
          <p className="mt-4 max-w-xl text-lg">{post.description}</p>
          {post.userId === user.id && (
            <div className="mt-8 flex gap-3">
              <Link href={`/posts/${post.id}/edit`} className="btn-secondary">
                Bearbeiten
              </Link>
              <DeleteButton postId={post.id} />
            </div>
          )}
        </div>

        <aside className="facts">
          <p className="fact">
            <span className="icon icon-calendar" aria-hidden="true" />
            <strong>{formatDate(post.date)}</strong>
          </p>
          <p className="fact">
            <span className="icon icon-pin" aria-hidden="true" />
            <span>
              <strong>{post.city}</strong>
              <small>{federalStates[post.federalState]}</small>
              {post.address && <small>{post.address}</small>}
              {mapsHref && (
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="maps"
                >
                  Auf Google Maps anzeigen
                  <span className="icon icon-external" aria-hidden="true" />
                </a>
              )}
            </span>
          </p>
          <p className="fact">
            <span className="icon icon-user" aria-hidden="true" />
            <Link
              href={`/profile/${post.userId}`}
              className="font-semibold underline"
            >
              {post.user.name}
            </Link>
          </p>
          <p className="fact">
            <span className="icon icon-mail" aria-hidden="true" />
            {contactHref ? (
              <a
                href={contactHref}
                className="font-semibold break-all underline"
              >
                {post.contact}
              </a>
            ) : (
              <span>{post.contact}</span>
            )}
          </p>
        </aside>
      </div>
    </div>
  );
}