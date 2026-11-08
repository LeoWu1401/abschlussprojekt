"use server";

import argon2 from "argon2";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function register(formData: FormData) {
  const name = String(formData.get("name") || "" ).trim();
  const email = String(formData.get("email") || "")
  .trim()
  .toLowerCase();
  const password = String(formData.get("password") || "");

  if (!name || !email || password.length < 8) {
    redirect("register?error=invalid");
  }
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    redirect("/register?error=taken");
  }

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 64 * 1024,
    timeCost: 3,
    parallelism: 1,
  });

  const user = await prisma.user.create({
    data: { name, email, password: passwordHash },
  });

  await createSession(user.id);
  redirect("/board");
}