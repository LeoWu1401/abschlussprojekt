"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { FederalState, PostType } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { federalStates, postTypes } from "@/lib/labels";
import { requireOwnPost } from "@/lib/posts";
import { requireUser } from "@/lib/session";

function readPostForm(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const type = String(formData.get("type") || "");
  const federalState = String(formData.get("federalState") || "");
  const city = String(formData.get("city") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const date = String(formData.get("date") || "");
  const description = String(formData.get("description") || "").trim();
  const contact = String(formData.get("contact") || "").trim();

  if (
    !title ||
    !Object.keys(postTypes).includes(type) ||
    !Object.keys(federalStates).includes(federalState) ||
    !city ||
    !date ||
    !description ||
    !contact
  ) {
    return null;
  }

  return {
    title,
    type: type as PostType,
    federalState: federalState as FederalState,
    city,
    address: address || null,
    date: new Date(date),
    description,
    contact,
  };
}

export async function createPost(formData: FormData) {
  const user = await requireUser();
  const data = readPostForm(formData);

  if (!data) {
    redirect("/posts/new?error=invalid");
  }

  const post = await prisma.post.create({
    data: { ...data, userId: user.id },
  });

  revalidatePath("/board");
  redirect(`/posts/${post.id}`);
}

export async function updatePost(formData: FormData) {
  const id = Number(formData.get("id"));
  await requireOwnPost(id);

  const data = readPostForm(formData);

  if (!data) {
    redirect(`/posts/${id}/edit?error=invalid`);
  }

  await prisma.post.update({ where: { id }, data });

  revalidatePath("/board");
  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}
export async function deletePost(id: number) {
  await requireOwnPost(id);
  await prisma.post.delete({ where: { id } });

  revalidatePath("/board");
  redirect("/board");
  
}