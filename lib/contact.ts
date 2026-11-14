export function getContactHref(contact: string, postTitle: string) {
  if (contact.startsWith("https://")) {
    return contact;
  }

  const looksLikeEmail =
    contact.includes("@") && !contact.startsWith("@") && !contact.includes(" ");

  if (looksLikeEmail) {
    const subject = encodeURIComponent(`Anfrage von Ink-Board: ${postTitle}`);
    return `mailto:${contact}?subject=${subject}`;
  }

  return null;
}
