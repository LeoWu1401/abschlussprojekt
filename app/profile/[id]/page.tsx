import Link from "next/link";
import { requireUser } from "@/lib/session";


export default async function ProfilePage() {
  await requireUser()
  
  return (
    <div>
      <h1>Profil</h1>
      <p>
        Hier stehen bald Name, Stadt, Studio, Stil, Instagram-Link und die
        kommenden Aktionen.
      </p>
      <Link href="/profile/edit" className="btn-secondary mt-4">Profil bearbeiten</Link>
    </div>
  );
}