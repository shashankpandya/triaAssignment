import { Search, Inbox, FileX, AlertCircle } from "lucide-react";
import Button from "./Button";

/**
 * EmptyState Component
 * Displays a friendly message when no data is available
 *
 * @param {string} type - Type of empty state: "search", "empty", "error", "custom"
 * @param {string} title - Main heading
 * @param {string} description - Supporting text
 * @param {ReactNode} icon - Custom icon component
 * @param {ReactNode} action - Optional call-to-action button or component
 */
export default function EmptyState({
  type = "empty",
  title,
  description,
  icon: CustomIcon,
  action,
}) {
  // Default icons and messages based on type
  const defaults = {
    search: {
      icon: Search,
      title: "No results found",
      description: "Try adjusting your search or filter criteria",
    },
    empty: {
      icon: Inbox,
      title: "No contacts yet",
      description: "Get started by adding your first contact",
    },
    error: {
      icon: AlertCircle,
      title: "Something went wrong",
      description: "We couldn't load your contacts. Please try again.",
    },
    custom: {
      icon: FileX,
      title: "No data",
      description: "",
    },
  };

  const config = defaults[type] || defaults.custom;
  const Icon = CustomIcon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Icon */}
      <div className="mb-4 text-gray-400">
        <Icon size={64} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {displayTitle}
      </h3>

      {/* Description */}
      {displayDescription && (
        <p className="text-gray-600 max-w-md mb-6">{displayDescription}</p>
      )}

      {/* Action */}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/**
 * Convenience component for search empty state
 */
export function SearchEmpty({ onClearFilters }) {
  return (
    <EmptyState
      type="search"
      action={
        onClearFilters && (
          <Button variant="secondary" onClick={onClearFilters}>
            Clear filters
          </Button>
        )
      }
    />
  );
}

/**
 * Convenience component for empty list state
 */
export function ListEmpty({ onAdd }) {
  return (
    <EmptyState
      type="empty"
      action={
        onAdd && (
          <Button variant="primary" onClick={onAdd}>
            Add contact
          </Button>
        )
      }
    />
  );
}

/**
 * Convenience component for error state
 */
export function ErrorEmpty({ onRetry }) {
  return (
    <EmptyState
      type="error"
      action={
        onRetry && (
          <Button variant="primary" onClick={onRetry}>
            Try again
          </Button>
        )
      }
    />
  );
}
