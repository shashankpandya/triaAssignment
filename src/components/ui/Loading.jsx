/**
 * Loading Spinner Component
 */
export default function Spinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`inline-block ${sizes[size]} border-gray-200 border-t-primary-600 rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * Full Page Loading Component
 */
export function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

/**
 * Inline Loading Component
 */
export function LoadingInline({ message }) {
  return (
    <div className="flex items-center justify-center py-12">
      <Spinner size="md" className="mr-3" />
      {message && <span className="text-gray-600">{message}</span>}
    </div>
  );
}
