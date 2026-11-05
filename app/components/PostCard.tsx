import Link from "next/link";

type PostCardProps = {
  post: {
    id: number;
    title: string;
    type: string;
    city: string;
    date: string;
    user: {
      name: string;
    };
  };
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="card">
      <span className="badge">{post.type}</span>
      <h2 className="mt-3">{post.title}</h2>
      <p className="mt-2">
        {post.city} · {post.date}
      </p>
      <p className="mt-1 text-sm opacity-70">von {post.user.name}</p>
    </Link>
  );
}
