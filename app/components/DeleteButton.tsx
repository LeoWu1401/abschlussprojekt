"use client"

import { deletePost } from "@/app/actions/posts";

type DeleteButtonProps = {
  postId: number;
};

export default function DeleteButton({ postId}: DeleteButtonProps) {
  async function handleClick() {
    if (confirm("Soll diese Aktion wirklich gelöscht werden?")) {
      await deletePost(postId);
    }
  }

  return (
    <button type="button" onClick={handleClick} className="btn-secondary">
      Löschen
    </button>
  );
}