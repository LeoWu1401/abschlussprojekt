import PostForm from "@/app/components/PostForm";
import { createPost } from "@/app/actions/posts";
import { requireUser } from "@/lib/session";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireUser();
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-xl">
      <h1>Neue Aktion</h1>
      {error && (
        <p className="error mt-4">Bitte alle Pflichtfelder ausfüllen.</p>
      )}
      <PostForm action={createPost} />
    </div>
  );
}
