"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { FederalState, PostType } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { federalStates, postTypes } from "@/lib/labels";
import { requireUser } from "@/lib/session";

export async function createPost(formData: FormData) {
  const user = await requireUser();

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
    redirect("/posts/new?error=invalid");
  }
  
  const post = await prisma.post.create({
    data: {
      title,
      type: type as PostType,
      federalState: federalState as FederalState,
      city,
      address: address || null,
      date: new Date(date),
      description,
      contact,
      userId: user.id
    },
  });

  revalidatePath("/board");
  redirect(`/posts/${post.id}`);
  
}