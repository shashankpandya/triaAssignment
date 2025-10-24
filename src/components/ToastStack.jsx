import { useEffect } from "react";
import { CheckCircle, Info, TriangleAlert, X } from "lucide-react";

const ICONS = {
  success: CheckCircle,
  info: Info,
  error: TriangleAlert,
};

export default function ToastStack({ toasts, onDismiss }) {
  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => onDismiss(toast.id), toast.duration ?? 4500)
    );
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [toasts, onDismiss]);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] ?? ICONS.info;
        return (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <Icon size={18} aria-hidden />
            <span>{toast.message}</span>
            <button
              type="button"
              className="toast-close"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={16} aria-hidden />
            </button>
          </div>
        );
      })}
    </div>
  );
}
