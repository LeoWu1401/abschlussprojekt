import Link from "next/link";
import PostCard from "../components/PostCard";

export default function BoardPage() {
  return (
    <div>
      <h1>Pinnwand</h1>
      <PostCard />
      <Link href="/posts/1">Beispiel-Aktion ansehen</Link>
    </div>
  );
}