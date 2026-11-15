"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export async function updateProfile(formData: FormData) {
  const user = await requireUser();

  const name = String(formData.get("name") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const studio = String(formData.get("studio") || "").trim();
  const tattooStyle = String(formData.get("tattooStyle") || "").trim();
  const instagramUrl = String(formData.get("instagramUrl") || "").trim();
  
    if (!name) {
      return { error: "Bitte gib einen Namen ein." };
    }

    if (instagramUrl && !instagramUrl.startsWith("https://")) {
      return { error: "Der Instagram-Link muss mit https:// beginnen." };
    }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name,
      city: city || null,
      studio: studio || null,
      tattooStyle: tattooStyle || null,
      instagramUrl: instagramUrl || null,
    },
  });

  revalidatePath(`/profile/${user.id}`);
  revalidatePath("/board");

  return { error: "" };
}