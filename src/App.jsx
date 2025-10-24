import { useMemo, useState } from "react";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import AddContactForm from "./components/AddContactForm";
import Header from "./components/Header";
import ContactDetails from "./components/ContactDetails";
import { mockContacts } from "./data/mockContacts";

export default function App() {
  const [contacts, setContacts] = useState(mockContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  const handleAddContact = (newContact) => {
    const contact = {
      id: Date.now(),
      ...newContact,
    };
    setContacts([...contacts, contact]);
    setShowAddForm(false);
    setSelectedContact(contact);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <div className="app-main-inner">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalContacts={contacts.length}
            filteredCount={filteredContacts.length}
          />

          <div className="actions-row">
            <button
              type="button"
              onClick={() => setShowAddForm((prev) => !prev)}
              className="add-contact-btn"
            >
              <span className="add-contact-icon" aria-hidden>
                +
              </span>
              {showAddForm ? "Close Form" : "Add Contact"}
            </button>
          </div>

          {showAddForm && (
            <AddContactForm
              onAddContact={handleAddContact}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          <ContactList
            contacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
            onSelectContact={handleSelectContact}
          />
        </div>
      </main>
      <ContactDetails
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </div>
  );
}
