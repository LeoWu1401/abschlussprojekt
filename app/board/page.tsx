import Link from "next/link";
import PostCard from "../components/PostCard";

export default function BoardPage() {
  const post = {
    id: 1,
    title: "Flash Day in Köln",
    type: "Flash Day",
    city: "Köln",
    date: "12.12.2026",
    user: {name: "Mira"},
  };

  return (
    <div>
      <h1>Pinnwand</h1>
      <PostCard post={post} />
      <Link href="/posts/1">Beispiel-Aktion ansehen</Link>
    </div>
  );
}