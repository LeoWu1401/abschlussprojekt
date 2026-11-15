import Link from "next/link";
import type { Post } from "@/app/generated/prisma/client";
import { postTypes } from "@/lib/labels";
import { formatDate } from "@/lib/format";

type PostCardProps = {
  post: Post & { user: { name: string } };
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className={`card type-${post.type}`}>
      <span className="badge">
        <span className="type-icon" aria-hidden="true" />
        {postTypes[post.type]}
      </span>
      <h2 className="mt-3">{post.title}</h2>
      <p className="meta mt-2">
        <span>
          <span className="icon icon-pin" aria-hidden="true" />
          {post.city}
        </span>
        <span>
          <span className="icon icon-calendar" aria-hidden="true" />
          {formatDate(post.date)}
        </span>
      </p>
      <p className="mt-auto pt-3 text-sm opacity-70">von {post.user.name}</p>
    </Link>
  );
}