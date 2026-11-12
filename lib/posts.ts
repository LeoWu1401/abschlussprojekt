import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export async function requireOwnPost(id: number) {
  const user = await requireUser();

  if (!Number.isInteger(id)) {
    notFound();
  }

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }
  
  if (post.userId !== user.id) {
    redirect(`/posts/${id}`);
  }

  return post;
}