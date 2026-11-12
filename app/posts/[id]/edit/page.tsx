import PostForm from "@/app/components/PostForm";
import { updatePost } from "@/app/actions/posts";
import { requireOwnPost } from "@/lib/posts";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const post = await requireOwnPost(Number(id));
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-xl">
      <h1>Aktion bearbeiten</h1>
      {error && (
        <p className="error mt-4">Bitte alle Pflichtfelder ausfüllen.</p>
      )}
      <PostForm action={updatePost} post={post} />
    </div>
  );
}
