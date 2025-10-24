import { Search } from "lucide-react";

export default function SearchBar({
  searchQuery,
  onSearchChange,
  totalContacts,
  filteredCount,
}) {
  return (
    <section className="panel search-panel" aria-label="Search contacts">
      <div className="search-input">
        <Search className="search-icon" size={20} aria-hidden />
        <input
          type="text"
          placeholder="Search contacts by name..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="search-field"
          aria-label="Search contacts"
        />
      </div>

      <div className="search-meta">
        <span className="search-stat">
          <strong>{filteredCount}</strong> visible
        </span>
        <span className="search-divider" role="presentation" />
        <span className="search-stat">
          <strong>{totalContacts}</strong> total
        </span>
        {searchQuery && (
          <button
            type="button"
            className="clear-search"
            onClick={() => onSearchChange("")}
          >
            Clear search
          </button>
        )}
      </div>
    </section>
  );
}
