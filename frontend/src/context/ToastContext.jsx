import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Toast from "../components/common/Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Stores the timeout ID of each active toast.
  const timers = useRef(new Map());

  // Remove a toast and clear its associated timer.
  const removeToast = useCallback((id) => {
    const timer = timers.current.get(id);

    if (timer) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }

    setToasts((previousToasts) =>
      previousToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  // Display a new notification.
  const showToast = useCallback(
    (message, type = "info") => {
      const id = crypto.randomUUID();

      const newToast = {
        id,
        message,
        type,
      };

      setToasts((previousToasts) => [...previousToasts, newToast]);

      // Automatically remove the notification after 4 seconds.
      const timer = window.setTimeout(() => {
        removeToast(id);
      }, 4000);

      timers.current.set(id, timer);
    },
    [removeToast],
  );

  // Clean up all active timers when the provider unmounts.
  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => {
        window.clearTimeout(timer);
      });

      timers.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Custom hook for accessing the toast functionality.
// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
