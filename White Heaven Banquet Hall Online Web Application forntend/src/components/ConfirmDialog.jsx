import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ConfirmDialog({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmLabel = "Yes",
  cancelLabel = "Cancel",
  onConfirm = () => {},
  onCancel = () => {}
}) {
  const overlayRef = useRef(null);
  const confirmBtnRef = useRef(null);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel, onConfirm]);

  // autofocus confirm button when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => confirmBtnRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* modal */}
      <div className="relative z-10 max-w-sm w-full mx-4 bg-white rounded-lg shadow-xl p-6">
        <h3 id="confirm-title" className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p id="confirm-desc" className="mt-2 text-sm text-gray-600">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            {cancelLabel}
          </button>

          <button
            ref={confirmBtnRef}
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
