import "./Toast.css";

function Toast({ message, type = "info", onClose }) {
  const toastIcons = {
    success: "✓",
    error: "✕",
    warning: "!",
    info: "i",
  };

  return (
    <div
      className={`toast toast-${type}`}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <div className="toast-icon">{toastIcons[type] || toastIcons.info}</div>

      <p className="toast-message">{message}</p>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
