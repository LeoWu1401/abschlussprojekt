import Link from "next/link";
import PostCard from "../components/PostCard";
import { startOfToday } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function BoardPage() {
  await requireUser();

  const posts = await prisma.post.findMany({
    where: { date: { gte: startOfToday() } },
    orderBy: { date: "asc" },
    include: { user: { select: { name: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1>Pinnwand</h1>
          <p className="max-w-md opacity-70">
            Flash Days, Guest Spots und gemeinsame Projekte von Artists aus ganz
            Deutschland.
          </p>
        </div>
        <Link href="/posts/new" className="btn-primary">
          + Neue Aktion
        </Link>
      </div>
      <hr className="stencil-rule mt-8" />
      {posts.length === 0 ? (
        <p className="mt-8">Gerade keine kommenden Aktionen.</p>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}