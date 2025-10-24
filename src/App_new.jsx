import { useState, useEffect } from "react";
import { ContactProvider, useContacts } from "./contexts/ContactContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import FiltersBar from "./components/FiltersBar";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import ContactTable from "./components/ContactTable";
import ContactCard from "./components/ContactCard";
import ContactDetails from "./components/ContactDetails";
import AddContactForm from "./components/AddContactForm";
import BulkActionsBar from "./components/BulkActionsBar";
import PaginationControls from "./components/PaginationControls";
import ActivityPanel from "./components/ActivityPanel";
import { ToastContainer } from "./components/ui/Toast";
import { LoadingScreen } from "./components/ui/Loading";
import { ListEmpty, SearchEmpty, ErrorEmpty } from "./components/ui/EmptyState";
import Modal from "./components/ui/Modal";
import { useToasts } from "./hooks/useToasts";
import { contactsToCsv, parseContactsCsv } from "./utils/csv";

/**
 * Main App Content Component
 * This component uses the ContactContext and contains all the business logic
 */
function AppContent() {
  const {
    contacts,
    selectedContacts,
    filters,
    pagination,
    loading,
    error,
    lastAction,
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
    deleteContacts,
    importContacts,
    exportContacts,
    toggleSelected,
    selectAll,
    clearSelected,
    setFilters,
    setPagination,
    clearError,
  } = useContacts();

  const { toasts, pushToast, dismissToast } = useToasts();

  // Local UI state
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'
  const [selectedContact, setSelectedContact] = useState(null); // For details modal
  const [formState, setFormState] = useState({
    isOpen: false,
    mode: "create", // 'create' or 'edit'
    contact: null,
  });
  const [activityLog, setActivityLog] = useState([]);

  // Helper to add activity
  const addActivity = (message) => {
    setActivityLog((prev) =>
      [
        {
          id: Date.now() + Math.random(),
          message,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 10)
    );
  };

  // Show toast for lastAction
  const showActionToast = (action) => {
    if (!action) return;

    switch (action.type) {
      case "create":
        pushToast({ type: "success", message: "Contact created successfully" });
        addActivity(`Created ${action.contact.name}`);
        break;
      case "update":
        pushToast({ type: "success", message: "Contact updated successfully" });
        addActivity(`Updated ${action.contact.name}`);
        break;
      case "delete":
        pushToast({ type: "info", message: "Contact deleted" });
        addActivity("Deleted contact");
        break;
      case "bulkDelete":
        pushToast({
          type: "info",
          message: `Deleted ${action.count} contact(s)`,
        });
        addActivity(`Deleted ${action.count} contact(s)`);
        break;
      case "import":
        pushToast({
          type: "success",
          message: `Imported ${action.count} contact(s)`,
        });
        addActivity(`Imported ${action.count} contact(s)`);
        break;
      default:
        break;
    }
  };

  // Watch for lastAction changes
  useEffect(() => {
    if (lastAction) {
      showActionToast(lastAction);
    }
  }, [lastAction]);

  // Form handlers
  const openCreateForm = () => {
    setFormState({ isOpen: true, mode: "create", contact: null });
    setSelectedContact(null);
  };

  const openEditForm = (contact) => {
    setFormState({ isOpen: true, mode: "edit", contact });
    setSelectedContact(null);
  };

  const closeForm = () => {
    setFormState({ isOpen: false, mode: "create", contact: null });
  };

  const handleFormSubmit = async (contactData) => {
    try {
      if (formState.mode === "edit" && formState.contact) {
        await updateContact(formState.contact.id, contactData);
      } else {
        const newContact = await createContact(contactData);
        setSelectedContact(newContact);
      }
      closeForm();
    } catch (error) {
      pushToast({
        type: "error",
        message: error.message || "Failed to save contact",
      });
    }
  };

  // Contact actions
  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
      if (formState.contact?.id === id) {
        closeForm();
      }
    } catch (error) {
      pushToast({
        type: "error",
        message: error.message || "Failed to delete contact",
      });
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedContacts.length === 0) {
      pushToast({ type: "info", message: "No contacts selected" });
      return;
    }

    try {
      await deleteContacts(selectedContacts);
      if (selectedContact && selectedContacts.includes(selectedContact.id)) {
        setSelectedContact(null);
      }
      if (
        formState.contact &&
        selectedContacts.includes(formState.contact.id)
      ) {
        closeForm();
      }
    } catch (error) {
      pushToast({
        type: "error",
        message: error.message || "Failed to delete contacts",
      });
    }
  };

  // CSV Import/Export
  const handleImportCsv = async (file) => {
    try {
      const records = await parseContactsCsv(file);
      await importContacts(records);
    } catch (error) {
      pushToast({
        type: "error",
        message: error.message || "Import failed",
      });
    }
  };

  const handleExportSelected = async () => {
    if (selectedContacts.length === 0) {
      pushToast({ type: "info", message: "No contacts selected" });
      return;
    }

    try {
      const data = await exportContacts(selectedContacts);
      const csv = contactsToCsv(data);
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
      addActivity(`Exported ${selectedContacts.length} contact(s)`);
    } catch (error) {
      pushToast({
        type: "error",
        message: error.message || "Export failed",
      });
    }
  };

  // Filter and pagination handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({ search: "", company: "", sortBy: "name", sortOrder: "asc" });
  };

  const handlePageChange = (page) => {
    setPagination({ page });
  };

  const handlePageSizeChange = (pageSize) => {
    setPagination({ page: 1, pageSize });
  };

  const handleSortChange = (sortBy, sortOrder) => {
    setFilters({ sortBy, sortOrder });
  };

  // Selection handlers
  const handleToggleSelection = (id) => {
    toggleSelected(id);
  };

  const handleToggleSelectAll = (isChecked) => {
    if (isChecked) {
      selectAll();
    } else {
      clearSelected();
    }
  };

  // Render loading state
  if (loading && contacts.length === 0) {
    return <LoadingScreen />;
  }

  // Render error state
  if (error && contacts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorEmpty onRetry={() => fetchContacts()} />
      </div>
    );
  }

  // Calculate if current page contacts are all selected
  const allSelected =
    contacts.length > 0 &&
    contacts.every((c) => selectedContacts.includes(c.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={filters.search || ""}
            onChange={(value) => setFilters({ search: value })}
            placeholder="Search contacts..."
          />
        </div>

        {/* Filters and View Controls */}
        <FiltersBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onResetFilters={handleResetFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCount={pagination.total}
          filteredCount={contacts.length}
          pageSize={pagination.pageSize}
          onPageSizeChange={handlePageSizeChange}
          onImportCsv={handleImportCsv}
        />

        {/* Add Contact Button */}
        <div className="mb-6">
          <button
            onClick={openCreateForm}
            className="btn-primary"
            type="button"
          >
            <span className="text-xl mr-2">+</span>
            Add Contact
          </button>
        </div>

        {/* Bulk Actions Bar */}
        {selectedContacts.length > 0 && (
          <BulkActionsBar
            selectedCount={selectedContacts.length}
            onClearSelection={clearSelected}
            onDeleteSelected={handleDeleteSelected}
            onExportSelected={handleExportSelected}
          />
        )}

        {/* Contact List/Table */}
        {contacts.length === 0 ? (
          filters.search || filters.company ? (
            <SearchEmpty onClearFilters={handleResetFilters} />
          ) : (
            <ListEmpty onAdd={openCreateForm} />
          )
        ) : viewMode === "card" ? (
          <ContactList
            contacts={contacts}
            onDeleteContact={handleDeleteContact}
            onSelectContact={setSelectedContact}
            onToggleSelection={handleToggleSelection}
            selectedIds={selectedContacts}
          />
        ) : (
          <ContactTable
            contacts={contacts}
            selectedIds={selectedContacts}
            onToggleSelect={handleToggleSelection}
            onToggleSelectAll={handleToggleSelectAll}
            sortConfig={{
              key: filters.sortBy,
              direction: filters.sortOrder,
            }}
            onSortChange={(config) =>
              handleSortChange(config.key, config.direction)
            }
            onOpenDetails={setSelectedContact}
          />
        )}

        {/* Pagination */}
        {contacts.length > 0 && (
          <PaginationControls
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.pageSize)}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {/* Contact Details Modal */}
      {selectedContact && (
        <ContactDetails
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onEdit={openEditForm}
          onDelete={(contact) => handleDeleteContact(contact.id)}
        />
      )}

      {/* Add/Edit Contact Modal */}
      {formState.isOpen && (
        <Modal
          isOpen={formState.isOpen}
          onClose={closeForm}
          title={formState.mode === "edit" ? "Edit Contact" : "Add Contact"}
          size="lg"
        >
          <AddContactForm
            mode={formState.mode}
            initialContact={formState.contact}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
          />
        </Modal>
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Activity Panel */}
      <ActivityPanel entries={activityLog} />
    </div>
  );
}

/**
 * Main App Component
 * Wraps AppContent with providers and error boundary
 */
export default function App() {
  return (
    <ErrorBoundary>
      <ContactProvider>
        <AppContent />
      </ContactProvider>
    </ErrorBoundary>
  );
}
