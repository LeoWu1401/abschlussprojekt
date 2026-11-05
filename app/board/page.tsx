
import PostCard from "../components/PostCard";
import posts from "../data/posts";

export default function BoardPage() {
  

  return (
    <div>
      <h1>Pinnwand</h1>
      <p className="mb-8 opacity-70">
        Hier stehen die Aktionen der Artists. Noch sind es Beispiel-Daten.
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
    </div>
  );
}