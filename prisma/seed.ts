import { randomUUID } from "crypto";
import argon2 from "argon2";
import { prisma } from "../lib/prisma";
import { users } from "./seed-data";

async function main() {
  const userCount = await prisma.user.count();

  if (userCount > 0) {
    for (const user of users) {
      await prisma.user.updateMany({
        where: { email: user.email },
        data: user.profile,
      });
    }

    console.log("Es gibt schon User. Profile der Beispiel-User aktualisiert.");
    return;
  }

  for (const user of users) {
    const password = await argon2.hash(randomUUID());

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password,
        ...user.profile,
        posts: { create: user.posts },
      },
    });
  }

  console.log("Beispiel-Daten angelegt.");
}

main()
.catch((error) => {
  console.error(error);
  process.exit(1);
})
.finally(() => prisma.$disconnect());

