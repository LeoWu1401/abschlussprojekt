import { requireUser } from "@/lib/session"

export default async function EditPostPage() {
  await requireUser()
  
  return (
    <div>
      <h1>Aktion bearbeiten</h1>
      <p>Hier kommt dasselbe Formular hin wie bei Neue Aktion, aber schon ausgefüllt.</p>
    </div>
  )
}