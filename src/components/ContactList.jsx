import ContactCard from "./ContactCard";

export default function ContactList({
  contacts,
  onDeleteContact,
  onSelectContact,
  onToggleSelection,
  selectedIds,
}) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="empty-state-title">No contacts found</h3>
        <p className="empty-state-description">
          Try adjusting your search or filters, or add a new contact to get
          started.
        </p>
      </div>
    );
  }

  return (
    <div className="contact-list" aria-label="Saved contacts">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDelete={onDeleteContact}
          onSelect={onSelectContact}
          onToggleSelection={onToggleSelection}
          isSelected={selectedIds.includes(contact.id)}
        />
      ))}
    </div>
  );
}
