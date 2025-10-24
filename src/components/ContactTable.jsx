import { Mail, MapPin, Phone } from "lucide-react";
import Avatar from "./Avatar";

export default function ContactTable({
  contacts,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  sortConfig,
  onSortChange,
  onOpenDetails,
}) {
  const headers = [
    { key: "name", label: "Name" },
    { key: "company", label: "Company" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
  ];

  const allSelected =
    contacts.length > 0 &&
    contacts.every((contact) => selectedIds.includes(contact.id));

  return (
    <div className="table-wrapper" role="region" aria-live="polite">
      <table className="contact-table">
        <thead>
          <tr>
            <th className="checkbox-cell">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(event) => onToggleSelectAll(event.target.checked)}
                aria-label="Select all contacts on this page"
              />
            </th>
            {headers.map((header) => (
              <TableHeader
                key={header.key}
                header={header}
                sortConfig={sortConfig}
                onSortChange={onSortChange}
              />
            ))}
            <th className="actions-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            const isSelected = selectedIds.includes(contact.id);
            return (
              <tr key={contact.id} className={isSelected ? "row-selected" : ""}>
                <td className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(contact.id)}
                    aria-label={`Select ${contact.name}`}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="table-name"
                    onClick={() => onOpenDetails(contact)}
                  >
                    <Avatar contact={contact} size="sm" />
                    <span>
                      <strong>{contact.name}</strong>
                      {contact.title && <small>{contact.title}</small>}
                    </span>
                  </button>
                </td>
                <td>{contact.company || "—"}</td>
                <td>
                  {contact.email ? (
                    <a href={`mailto:${contact.email}`} className="table-link">
                      <Mail size={16} aria-hidden />
                      {contact.email}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  {contact.phone ? (
                    <a href={`tel:${contact.phone}`} className="table-link">
                      <Phone size={16} aria-hidden />
                      {contact.phone}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="address-cell">
                  {contact.address ? (
                    <span className="table-link muted">
                      <MapPin size={16} aria-hidden />
                      {contact.address}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="actions-cell">
                  <button
                    type="button"
                    className="table-view"
                    onClick={() => onOpenDetails(contact)}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
          {contacts.length === 0 && (
            <tr>
              <td colSpan={7} className="empty-table">
                No contacts for this page.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function TableHeader({ header, sortConfig, onSortChange }) {
  const isActive = sortConfig.key === header.key;
  const direction = isActive ? sortConfig.direction : undefined;

  const handleClick = () => {
    if (!isActive) {
      onSortChange({ key: header.key, direction: "asc" });
    } else {
      onSortChange({
        key: header.key,
        direction: direction === "asc" ? "desc" : "asc",
      });
    }
  };

  return (
    <th>
      <button
        type="button"
        className={`table-header ${isActive ? "is-active" : ""}`}
        onClick={handleClick}
        aria-sort={
          isActive ? (direction === "asc" ? "ascending" : "descending") : "none"
        }
      >
        {header.label}
        {isActive && (
          <span className="sort-indicator">
            {direction === "asc" ? "▲" : "▼"}
          </span>
        )}
      </button>
    </th>
  );
}
