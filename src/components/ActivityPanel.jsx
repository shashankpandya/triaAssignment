import { Clock3 } from "lucide-react";

export default function ActivityPanel({ entries }) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <aside className="panel activity-panel" aria-label="Recent activity">
      <header className="activity-header">
        <Clock3 size={18} aria-hidden />
        <span>Recent Activity</span>
      </header>
      <ul className="activity-list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <span>{entry.message}</span>
            <time dateTime={entry.timestamp}>
              {formatTime(entry.timestamp)}
            </time>
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
  } catch (error) {
    return "";
  }
}
