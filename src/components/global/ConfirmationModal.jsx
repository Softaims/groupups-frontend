import { X } from "lucide-react";
import { useEffect } from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default", // default, delete, warning
  showCloseIcon = true,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getButtonStyles = () => {
    switch (type) {
      case "delete":
        return {
          confirm: "bg-red-600 hover:bg-red-700 text-white",
          cancel: "bg-[#1a1e24] hover:bg-[#2a2e34] text-white border border-[#2a2e34]",
        };
      case "warning":
        return {
          confirm: "bg-amber-500 hover:bg-amber-600 text-white",
          cancel: "bg-[#1a1e24] hover:bg-[#2a2e34] text-white border border-[#2a2e34]",
        };
      default:
        return {
          confirm: "bg-[#3CBFAE] hover:bg-[#35a89a] text-white",
          cancel: "bg-[#1a1e24] hover:bg-[#2a2e34] text-white border border-[#2a2e34]",
        };
    }
  };

  const buttonStyles = getButtonStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className="relative w-full max-w-md bg-[#0f1216] rounded-lg shadow-lg border border-[#2a2e34] p-6 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseIcon && (
          <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        )}
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <div className="mb-6 text-gray-300">{message}</div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button onClick={onClose} className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium ${buttonStyles.cancel}`}>
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium ${buttonStyles.confirm}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
