import { useEffect } from "react";

import {
  Building2,
  Link2,
  Mail,
  MapPin,
  Phone,
  StickyNote,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import Avatar from "./Avatar";

export default function ContactDetails({ contact, onClose, onEdit, onDelete }) {
  useEffect(() => {
    if (!contact) {
      return undefined;
    }

    const handleKeyUp = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [contact, onClose]);

  if (!contact) {
    return null;
  }

  const infoRows = [
    {
      id: "email",
      icon: Mail,
      label: "Email",
      value: contact.email,
      render: (value) => (
        <a href={`mailto:${value}`} className="detail-link">
          {value}
        </a>
      ),
    },
    {
      id: "phone",
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      render: (value) => (
        <a href={`tel:${value}`} className="detail-link">
          {value}
        </a>
      ),
    },
    {
      id: "address",
      icon: MapPin,
      label: "Location",
      value: contact.address,
      render: (value) => <span>{value}</span>,
    },
    {
      id: "company",
      icon: Building2,
      label: "Company",
      value: contact.company,
      render: (value) => <span>{value}</span>,
    },
    {
      id: "website",
      icon: Link2,
      label: "Website",
      value: contact.website,
      render: (value) => (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="detail-link"
        >
          {value}
        </a>
      ),
    },
  ].filter((row) => row.value && row.value.trim().length > 0);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-details-title"
      onMouseDown={handleOverlayClick}
    >
      <div className="modal-panel" role="document">
        <button
          type="button"
          onClick={onClose}
          className="modal-close"
          aria-label="Close contact details"
        >
          <X size={22} aria-hidden />
        </button>

        <header className="modal-header">
          <Avatar contact={contact} size="lg" />
          <div>
            <h2 className="modal-title" id="contact-details-title">
              {contact.name}
            </h2>
            <p className="modal-subtitle">{contact.title || "Contact"}</p>
            {contact.company && (
              <p className="modal-company">{contact.company}</p>
            )}
          </div>
        </header>

        <div className="modal-actions">
          <button
            type="button"
            className="modal-action"
            onClick={() => onEdit(contact)}
          >
            <Pencil size={16} aria-hidden />
            Edit
          </button>
          <button
            type="button"
            className="modal-action danger"
            onClick={() => onDelete(contact)}
          >
            <Trash2 size={16} aria-hidden />
            Delete
          </button>
        </div>

        <dl className="modal-details">
          {infoRows.map(({ id, icon: Icon, label, render, value }) => (
            <div key={id} className="modal-detail-row">
              <dt>
                <Icon size={18} aria-hidden />
                <span>{label}</span>
              </dt>
              <dd>{render(value)}</dd>
            </div>
          ))}
        </dl>

        {contact.notes && (
          <section className="modal-notes">
            <header>
              <StickyNote size={18} aria-hidden />
              <span>Notes</span>
            </header>
            <p>{contact.notes}</p>
          </section>
        )}
      </div>
    </div>
  );
}
