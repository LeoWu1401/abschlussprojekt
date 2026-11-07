import { randomUUID } from "crypto";
import argon2 from "argon2";
import { prisma } from "../lib/prisma";
import { users } from "./seed-data";

async function main() {
  const userCount = await prisma.user.count();

  if (userCount > 0) {
    console.log("Es gibt schon User. Der seed macht nichts.");
    return;
  }

  for (const user of users) {
    const password = await argon2.hash(randomUUID());

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password,
        posts: {create: user.posts },
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

