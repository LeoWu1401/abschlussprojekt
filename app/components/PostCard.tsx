import Link from "next/link";
import type { Post } from "@/app/generated/prisma/client";
import { postTypes } from "@/lib/labels";
import { formatDate } from "@/lib/format";


type PostCardProps = {
  post: Post & { user: { name: string } };
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="card">
      <span className="badge">{postTypes[post.type]}</span>
      <h2 className="mt-3">{post.title}</h2>
      <p className="mt-2">
        {post.city} · {formatDate(post.date)}
      </p>
      <p className="mt-1 text-sm opacity-70">von {post.user.name}</p>
    </Link>
  );
}