import { useEffect, useMemo, useState } from "react";
import ContactList from "./components/ContactList";
import AddContactForm from "./components/AddContactForm";
import Header from "./components/Header";
import ContactDetails from "./components/ContactDetails";
import FiltersBar from "./components/FiltersBar";
import BulkActionsBar from "./components/BulkActionsBar";
import PaginationControls from "./components/PaginationControls";
import ContactTable from "./components/ContactTable";
import ToastStack from "./components/ToastStack";
import ActivityPanel from "./components/ActivityPanel";
import { mockContacts } from "./data/mockContacts";
import { useToasts } from "./hooks/useToasts";
import { contactsToCsv, parseContactsCsv } from "./utils/csv";

const createInitialFormState = () => ({
  isOpen: false,
  mode: "create",
  contact: null,
});

export default function App() {
  const [contacts, setContacts] = useState(mockContacts);
  const [formState, setFormState] = useState(createInitialFormState);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [viewMode, setViewMode] = useState("card");
  const [filters, setFilters] = useState({
    query: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [pageSize, setPageSize] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [activity, setActivity] = useState([]);
  const { toasts, pushToast, dismissToast } = useToasts();
  const isFormOpen = formState.isOpen;
  const isEditing = formState.mode === "edit";

  // Apply text and field filters to the full contact collection
  const filteredContacts = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return contacts.filter((contact) => {
      const matchesQuery = !query
        ? true
        : ["name", "email", "phone", "company", "address"].some((key) =>
            contact[key]?.toLowerCase().includes(query)
          );
      const matchesName =
        !filters.name ||
        contact.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesEmail =
        !filters.email ||
        contact.email?.toLowerCase().includes(filters.email.toLowerCase());
      const matchesPhone =
        !filters.phone ||
        contact.phone?.toLowerCase().includes(filters.phone.toLowerCase());
      const matchesCompany =
        !filters.company ||
        contact.company?.toLowerCase().includes(filters.company.toLowerCase());
      return (
        matchesQuery &&
        matchesName &&
        matchesEmail &&
        matchesPhone &&
        matchesCompany
      );
    });
  }, [contacts, filters]);

  const sortedContacts = useMemo(() => {
    const nextContacts = [...filteredContacts];
    nextContacts.sort((a, b) => {
      const valueA = (a[sortConfig.key] ?? "").toString().toLowerCase();
      const valueB = (b[sortConfig.key] ?? "").toString().toLowerCase();
      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return nextContacts;
  }, [filteredContacts, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedContacts.length / pageSize));

  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedContacts.slice(start, start + pageSize);
  }, [sortedContacts, currentPage, pageSize]);

  // Auto-adjust current page if it exceeds total pages after deletion/filtering
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  const closeForm = ({ restoreContact = false } = {}) => {
    if (restoreContact && formState.mode === "edit" && formState.contact) {
      setSelectedContact(formState.contact);
    }
    setFormState(createInitialFormState());
  };

  const openCreateForm = () => {
    setFormState({ isOpen: true, mode: "create", contact: null });
    setSelectedContact(null);
  };

  const openEditForm = (contact) => {
    setFormState({ isOpen: true, mode: "edit", contact });
    setSelectedContact(null);
  };

  const handleFormSubmit = (submittedContact) => {
    if (formState.mode === "edit" && formState.contact) {
      const updatedContact = {
        ...formState.contact,
        ...submittedContact,
      };
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        )
      );
      setSelectedContact(updatedContact);
      setActivity((prev) =>
        [buildActivity(`Updated ${updatedContact.name}`), ...prev].slice(0, 10)
      );
      pushToast({ type: "success", message: "Contact updated" });
    } else {
      const newContact = {
        id: Date.now(),
        ...submittedContact,
      };
      setContacts((prev) => [...prev, newContact]);
      setSelectedContact(newContact);
      setActivity((prev) =>
        [buildActivity(`Added ${newContact.name}`), ...prev].slice(0, 10)
      );
      pushToast({ type: "success", message: "Contact added" });
    }

    closeForm();
  };

  const handleDeleteContact = (id) => {
    const contactToDelete = contacts.find((contact) => contact.id === id);
    setContacts((prev) => prev.filter((contact) => contact.id !== id));

    // Close detail modal if deleted contact is being viewed
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }

    // Close form if deleted contact is being edited
    if (formState.isOpen && formState.contact?.id === id) {
      closeForm();
    }

    // Remove from selection
    setSelectedIds((prev) => prev.filter((contactId) => contactId !== id));

    // Add activity log
    setActivity((prev) =>
      [
        buildActivity(
          contactToDelete
            ? `Deleted ${contactToDelete.name}`
            : "Deleted a contact"
        ),
        ...prev,
      ].slice(0, 10)
    );

    pushToast({ type: "info", message: "Contact deleted" });
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    if (formState.isOpen) {
      closeForm();
    }
  };

  const handleToggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedIds(paginatedContacts.map((contact) => contact.id));
    } else {
      setSelectedIds((prev) =>
        prev.filter(
          (id) => !paginatedContacts.some((contact) => contact.id === id)
        )
      );
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      pushToast({ type: "info", message: "Select contacts to delete" });
      return;
    }

    const idsToRemove = new Set(selectedIds);
    setContacts((prev) =>
      prev.filter((contact) => !idsToRemove.has(contact.id))
    );

    if (selectedContact && idsToRemove.has(selectedContact.id)) {
      setSelectedContact(null);
    }

    if (
      formState.isOpen &&
      formState.contact &&
      idsToRemove.has(formState.contact.id)
    ) {
      closeForm();
    }

    setActivity((prev) =>
      [
        buildActivity(
          selectedIds.length === 1
            ? "Deleted 1 contact"
            : `Deleted ${selectedIds.length} contacts`
        ),
        ...prev,
      ].slice(0, 10)
    );
    pushToast({ type: "info", message: "Selected contacts deleted" });
    setSelectedIds([]);
  };

  const handleExportSelected = () => {
    if (selectedIds.length === 0) {
      pushToast({ type: "info", message: "Select contacts to export" });
      return;
    }

    const idsToExport = new Set(selectedIds);
    const exportContacts = contacts.filter((contact) =>
      idsToExport.has(contact.id)
    );

    if (exportContacts.length === 0) {
      pushToast({ type: "info", message: "No contacts available to export" });
      return;
    }
    const csv = contactsToCsv(exportContacts);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `contacts-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    pushToast({ type: "success", message: "Export complete" });
  };

  const handleImportCsv = async (file) => {
    try {
      const records = await parseContactsCsv(file);
      const mappedContacts = records.map((record) => ({
        id: Date.now() + Math.random(),
        ...record,
      }));
      setContacts((prev) => [...prev, ...mappedContacts]);
      pushToast({
        type: "success",
        message: `Imported ${mappedContacts.length} contacts`,
      });
      setActivity((prev) =>
        [
          buildActivity(`Imported ${mappedContacts.length} contacts`),
          ...prev,
        ].slice(0, 10)
      );
    } catch (error) {
      pushToast({ type: "error", message: error.message || "Import failed" });
    }
  };

  const handleSortChange = (nextSort) => {
    setSortConfig(nextSort);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ query: "", name: "", email: "", phone: "", company: "" });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <div className="app-main-inner">
          <FiltersBar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onResetFilters={handleResetFilters}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            totalCount={contacts.length}
            filteredCount={filteredContacts.length}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            onImportCsv={handleImportCsv}
          />

          <div className="actions-row">
            <button
              type="button"
              onClick={
                isFormOpen
                  ? () => closeForm({ restoreContact: isEditing })
                  : openCreateForm
              }
              className="add-contact-btn"
            >
              <span className="add-contact-icon" aria-hidden>
                +
              </span>
              {isFormOpen
                ? isEditing
                  ? "Close Editor"
                  : "Close Form"
                : "Add Contact"}
            </button>
          </div>

          <AddContactForm
            isOpen={isFormOpen}
            mode={formState.mode}
            initialContact={formState.contact}
            onSubmit={handleFormSubmit}
            onCancel={() => closeForm({ restoreContact: isEditing })}
          />

          <BulkActionsBar
            selectedCount={selectedIds.length}
            onClearSelection={() => setSelectedIds([])}
            onDeleteSelected={handleDeleteSelected}
            onExportSelected={handleExportSelected}
          />

          {viewMode === "card" ? (
            <ContactList
              contacts={paginatedContacts}
              onDeleteContact={handleDeleteContact}
              onSelectContact={handleSelectContact}
              onToggleSelection={handleToggleSelection}
              selectedIds={selectedIds}
            />
          ) : (
            <ContactTable
              contacts={paginatedContacts}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelection}
              onToggleSelectAll={handleToggleSelectAll}
              sortConfig={sortConfig}
              onSortChange={handleSortChange}
              onOpenDetails={handleSelectContact}
            />
          )}

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
      <ContactDetails
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onEdit={openEditForm}
        onDelete={(contact) => handleDeleteContact(contact.id)}
      />
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
      <ActivityPanel entries={activity} />
    </div>
  );
}

function buildActivity(message) {
  return {
    id: Date.now() + Math.random(),
    message,
    timestamp: new Date().toISOString(),
  };
}
