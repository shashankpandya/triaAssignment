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
    <aside className="bulk-actions" role="region" aria-live="polite">
      <div className="bulk-actions-content">
        <p>
          <strong>{selectedCount}</strong> selected
        </p>
        <div className="bulk-actions-buttons">
          <button
            type="button"
            onClick={onDeleteSelected}
            className="bulk-btn danger"
          >
            <Trash2 size={18} aria-hidden />
            Delete
          </button>
          <button type="button" onClick={onExportSelected} className="bulk-btn">
            <Download size={18} aria-hidden />
            Export CSV
          </button>
          <button
            type="button"
            onClick={onClearSelection}
            className="bulk-btn ghost"
          >
            <X size={18} aria-hidden />
            Clear
          </button>
        </div>
      </div>
    </aside>
  );
}
