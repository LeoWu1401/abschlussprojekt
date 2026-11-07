import PostCard from "../components/PostCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BoardPage() {
  const posts = await prisma.post.findMany({
    orderBy: { date: "asc" },
    include: { user: { select: { name: true } } },
  });

  return (
    <div>
      <h1>Pinnwand</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}