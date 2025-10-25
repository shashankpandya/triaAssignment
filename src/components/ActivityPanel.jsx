import { useState, useEffect } from "react";
import { Clock3, X } from "lucide-react";

export default function ActivityPanel({ entries }) {
  const [visibleEntries, setVisibleEntries] = useState([]);
  const [dismissingEntries, setDismissingEntries] = useState(new Set());

  // Update visible entries when new entries are added
  useEffect(() => {
    setVisibleEntries(entries);
  }, [entries]);

  // Auto-dismiss entries after 5 seconds
  useEffect(() => {
    if (visibleEntries.length === 0) return;

    const timers = visibleEntries.map((entry) =>
      setTimeout(() => {
        handleDismiss(entry.id);
      }, 5000)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [visibleEntries]);

  const handleDismiss = (entryId) => {
    // Start fade-out animation
    setDismissingEntries((prev) => new Set(prev).add(entryId));

    // Remove entry after animation completes
    setTimeout(() => {
      setVisibleEntries((prev) => prev.filter((entry) => entry.id !== entryId));
      setDismissingEntries((prev) => {
        const next = new Set(prev);
        next.delete(entryId);
        return next;
      });
    }, 300); // Match the CSS transition duration
  };

  if (visibleEntries.length === 0) {
    return null;
  }

  return (
    <aside className="panel activity-panel" aria-label="Recent activity">
      <header className="activity-header">
        <Clock3 size={18} aria-hidden />
        <span>Recent Activity</span>
      </header>
      <ul className="activity-list">
        {visibleEntries.map((entry) => (
          <li
            key={entry.id}
            className={dismissingEntries.has(entry.id) ? "is-dismissing" : ""}
          >
            <div className="activity-content">
              <span>{entry.message}</span>
              <time dateTime={entry.timestamp}>
                {formatTime(entry.timestamp)}
              </time>
            </div>
            <button
              type="button"
              className="activity-close"
              onClick={() => handleDismiss(entry.id)}
              aria-label="Dismiss notification"
            >
              <X size={16} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function formatTime(timestamp) {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    });
  } catch {
    return "";
  }
}
