export default function Avatar({ contact, size = "md" }) {
  const initials = buildInitials(contact?.name);
  const hasImage = Boolean(contact?.avatar);
  return (
    <span className={`avatar avatar-${size}`} aria-hidden>
      {hasImage ? <img src={contact.avatar} alt="" /> : initials}
    </span>
  );
}

function buildInitials(name = "") {
  const parts = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2);
  return parts.length ? parts.join("") : "?";
}
