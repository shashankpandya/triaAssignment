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
      <section className="panel empty-state" role="status">
        <h3>No contacts match your search</h3>
        <p>Try adjusting the filters or add a new contact to get started.</p>
      </section>
    );
  }

  return (
    <section aria-label="Saved contacts">
      <div className="contact-grid">
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
    </section>
  );
}
