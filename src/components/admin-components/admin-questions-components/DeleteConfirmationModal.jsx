"use client";

import { X } from "lucide-react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, questionText }) => {
  if (!isOpen) return null;

  // Truncate question text if it's too long
  const truncatedQuestion = questionText.length > 50 ? `${questionText.substring(0, 50)}...` : questionText;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Delete Question</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-4">Are you sure you want to delete this question? This action cannot be undone.</p>
          <div className="p-3 bg-[#0c0f12] border border-[#2a2e34] rounded-md">
            <p className="text-white font-medium italic">"{truncatedQuestion}"</p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#0c0f12] border border-[#2a2e34] text-white hover:bg-[#2a2e34] transition-colors"
          >
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
