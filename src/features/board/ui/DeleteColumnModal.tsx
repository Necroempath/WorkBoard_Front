import { createPortal } from "react-dom"

export const DeleteColumnModal = ({
  onConfirm,
  onClose
}: {
  onConfirm: () => void
  onClose: () => void
}) => {
    return createPortal(
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          Are you sure?
        </h2>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer
             text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
 )
}