import { useRef, useState } from "react";
import {
  Filter,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  Upload,
} from "lucide-react";

const PAGE_SIZE_OPTIONS = [6, 9, 12, 18, 24];

export default function FiltersBar({
  filters,
  onFiltersChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
  pageSize,
  onPageSizeChange,
  onImportCsv,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFiltersChange({ ...filters, [name]: value });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onImportCsv(file);
    }
    event.target.value = "";
  };

  return (
    <section className="panel filters-panel" aria-label="Filter contacts">
      <div className="filters-top">
        <div className="search-field-wrapper">
          <Search className="search-icon" size={20} aria-hidden />
          <input
            type="search"
            name="query"
            value={filters.query}
            onChange={handleInputChange}
            placeholder="Search contacts"
            className="search-field"
            aria-label="Search all contact fields"
          />
          <button
            type="button"
            className="filters-button"
            onClick={() => setShowAdvanced((prev) => !prev)}
            aria-expanded={showAdvanced}
          >
            <SlidersHorizontal size={18} aria-hidden />
            Advanced
          </button>
          <button
            type="button"
            className="filters-button"
            onClick={onResetFilters}
          >
            <Filter size={18} aria-hidden />
            Clear
          </button>
        </div>

        <div className="filters-meta">
          <span>
            <strong>{filteredCount}</strong> visible
          </span>
          <span className="meta-divider" aria-hidden />
          <span>
            <strong>{totalCount}</strong> total
          </span>
        </div>

        <div className="filters-actions">
          <div className="view-toggle" role="group" aria-label="View mode">
            <button
              type="button"
              className={`view-toggle-btn ${
                viewMode === "card" ? "is-active" : ""
              }`}
              onClick={() => onViewModeChange("card")}
              aria-pressed={viewMode === "card"}
            >
              <LayoutGrid size={18} aria-hidden />
              Cards
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${
                viewMode === "list" ? "is-active" : ""
              }`}
              onClick={() => onViewModeChange("list")}
              aria-pressed={viewMode === "list"}
            >
              <List size={18} aria-hidden />
              List
            </button>
          </div>

          <label className="page-size">
            <span>Page size</span>
            <select
              value={pageSize}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
              aria-label="Number of contacts per page"
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="import-button"
            onClick={handleImportClick}
          >
            <Upload size={18} aria-hidden />
            Import CSV
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {showAdvanced && (
        <div className="filters-grid">
          <FilterInput
            label="Name"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            placeholder="e.g. Alice"
          />
          <FilterInput
            label="Email"
            name="email"
            value={filters.email}
            onChange={handleInputChange}
            placeholder="e.g. name@example.com"
          />
          <FilterInput
            label="Phone"
            name="phone"
            value={filters.phone}
            onChange={handleInputChange}
            placeholder="e.g. +1 555"
          />
          <FilterInput
            label="Company"
            name="company"
            value={filters.company}
            onChange={handleInputChange}
            placeholder="e.g. Northwind"
          />
        </div>
      )}
    </section>
  );
}

function FilterInput({ label, name, value, onChange, placeholder }) {
  return (
    <label className="filter-input">
      <span>{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}
