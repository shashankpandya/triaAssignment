import { Mail, MapPin, Phone, Trash2 } from "lucide-react";

export default function ContactCard({ contact, onDelete, onSelect }) {
  const handleSelect = () => {
    if (typeof onSelect === "function") {
      onSelect(contact);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(contact.id);
  };

  return (
    <article
      className="contact-card"
      aria-label={`${contact.name} contact`}
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <div className="card-header">
        <div className="card-heading">
          <h3 className="card-title">{contact.name}</h3>
          <p className="card-subtitle">{contact.title || "Contact"}</p>
          {contact.company && <p className="card-company">{contact.company}</p>}
        </div>
        <button
          type="button"
          onClick={handleDelete}
          className="delete-button"
          aria-label={`Delete ${contact.name}`}
        >
          <Trash2 size={18} aria-hidden />
        </button>
      </div>

      <div className="contact-meta">
        {contact.email && (
          <div className="contact-meta-row">
            <Mail size={18} aria-hidden />
            <a className="contact-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        )}

        {contact.phone && (
          <div className="contact-meta-row">
            <Phone size={18} aria-hidden />
            <a className="contact-link" href={`tel:${contact.phone}`}>
              {contact.phone}
            </a>
          </div>
        )}

        {contact.address && (
          <div className="contact-meta-row">
            <MapPin size={18} aria-hidden />
            <span>{contact.address}</span>
          </div>
        )}
      </div>
    </article>
  );
}
