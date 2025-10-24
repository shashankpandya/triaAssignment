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
            placeholder="Search contacts by name, email, phone..."
            className="search-field"
            aria-label="Search all contact fields"
          />
        </div>

        <div className="filter-controls">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowAdvanced((prev) => !prev)}
            aria-expanded={showAdvanced}
          >
            <SlidersHorizontal size={18} aria-hidden />
            {showAdvanced ? "Hide" : "Show"} Filters
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onResetFilters}
          >
            <Filter size={18} aria-hidden />
            Clear
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              viewMode === "card" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => onViewModeChange("card")}
            aria-pressed={viewMode === "card"}
            aria-label="Card view"
          >
            <LayoutGrid size={18} aria-hidden />
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              viewMode === "list" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => onViewModeChange("list")}
            aria-pressed={viewMode === "list"}
            aria-label="List view"
          >
            <List size={18} aria-hidden />
          </button>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="form-select"
            style={{ width: "auto", minWidth: "80px" }}
            aria-label="Number of contacts per page"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleImportClick}
          >
            <Upload size={18} aria-hidden />
            Import
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

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          fontSize: "0.875rem",
          color: "var(--color-text-secondary)",
        }}
      >
        <span>
          Showing <strong>{filteredCount}</strong> of{" "}
          <strong>{totalCount}</strong> contacts
        </span>
      </div>

      {showAdvanced && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
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
    <div className="form-group" style={{ marginBottom: 0 }}>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  );
}
