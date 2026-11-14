import { notFound } from "next/navigation";
import PostCard from "@/app/components/PostCard";
import ProfileDetails from "@/app/components/ProfileDetails";
import { startOfToday } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentUser = await requireUser();
  const { id } = await params;
  const userId = Number(id);

  if (!Number.isInteger(userId)) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      city: true,
      studio: true,
      tattooStyle: true,
      instagramUrl: true,
      posts: {
        where: { date: { gte: startOfToday() } },
        orderBy: { date: "asc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const { posts, ...profile } = user;

  return (
    <div>
      <ProfileDetails profile={profile} isOwner={user.id === currentUser.id} />

      <h2 className="mt-10 text-2xl">Kommende Aktionen</h2>
      {posts.length === 0 ? (
        <p className="mt-2">Gerade keine kommenden Aktionen.</p>
      ) : (
        <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={{ ...post, user: { name: user.name } }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
