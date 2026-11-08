import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SESSION_DAYS = 14;

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  const session = await prisma.session.create({
    data: { userId, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set("session", session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
  
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (sessionId) {
    await prisma.session.deleteMany({ where: { id: sessionId }});
  }

  cookieStore.delete("session")
  
}