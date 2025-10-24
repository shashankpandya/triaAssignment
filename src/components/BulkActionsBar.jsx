import { Download, Trash2, X } from "lucide-react";

export default function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onDeleteSelected,
  onExportSelected,
}) {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <aside className="bulk-actions-bar" role="region" aria-live="polite">
      <div className="bulk-actions-info">
        <strong>{selectedCount}</strong> contact{selectedCount !== 1 ? "s" : ""}{" "}
        selected
      </div>
      <div className="bulk-actions-buttons">
        <button
          type="button"
          onClick={onExportSelected}
          className="btn btn-sm"
          aria-label="Export selected contacts"
        >
          <Download size={18} aria-hidden />
          Export
        </button>
        <button
          type="button"
          onClick={onDeleteSelected}
          className="btn btn-danger btn-sm"
          aria-label="Delete selected contacts"
        >
          <Trash2 size={18} aria-hidden />
          Delete
        </button>
        <button
          type="button"
          onClick={onClearSelection}
          className="btn btn-ghost btn-sm"
          aria-label="Clear selection"
        >
          <X size={18} aria-hidden />
          Clear
        </button>
      </div>
    </aside>
  );
}
