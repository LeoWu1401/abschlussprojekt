import Link from "next/link";

export default function ProfilePage() {
  return (
    <div>
      <h1>Profil</h1>
      <p>Hier stehen bald Name, Stadt, Studio, Stil, Instagram-Link und die kommenden Aktionen.</p>
      <Link href="/profile/edit">Profil bearbeiten</Link>
    </div>
  )
}