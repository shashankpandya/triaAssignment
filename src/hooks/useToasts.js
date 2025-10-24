import { useCallback, useState } from "react";

let counter = 0;

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((toast) => {
    counter += 1;
    const nextToast = {
      id: counter,
      type: toast.type ?? "info",
      message: toast.message,
      duration: toast.duration ?? 4500,
    };
    setToasts((prev) => [...prev, nextToast]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => setToasts([]), []);

  return { toasts, pushToast, dismissToast, clearToasts };
}
