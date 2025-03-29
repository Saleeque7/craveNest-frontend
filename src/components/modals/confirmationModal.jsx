import React, { memo } from 'react';

export default memo( function ConfirmationModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = 'Are you sure?', 
    description = 'This action cannot be undone.' 
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30  backdrop-blur-sm flex items-start justify-center pt-20 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4 opacity-100">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600">{description}</p>

                <div className="flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
})
