import { requireUser } from "@/lib/session"

export default async function EditProfilePage() {
  await requireUser();
  
  return (
    <div>
      <h1>Profil bearbeiten</h1>
      <p>Hier kommt das Formular hin: Stadt, Studio, Stil, Instagram-Link.</p>
    </div>
  )
}