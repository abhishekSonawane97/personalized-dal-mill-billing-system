import React, { useEffect } from 'react';
import PrintReceipt from './PrintReceipt';

const Receipt_Pop = ({ formData, onClose, clearFormData }) => {

    useEffect(() => {
        const closeOnEscape = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, []);

    const handleClose = () => {
        onClose();
        clearFormData();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30" onClick={handleClose}>
            <div
                className="bg-white p-6 rounded-lg shadow-lg relative"
                style={{
                    maxHeight: '80vh',
                    maxWidth: '90vw',
                    overflowY: 'auto',     // vertical scroll if content too big
                    overflowX: 'hidden',   // no horizontal scroll
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="absolute top-1 right-0 text-gray-600 hover:text-black" onClick={handleClose}>✖</button>
                <div className="flex items-center flex-col space-x-3">
                    <PrintReceipt formData={formData} />
                    <div className="btns flex gap-2">
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md" onClick={handleClose}>Print Receipt</button>
                        <button className="mt-4 px-8 py-2 bg-blue-600 text-white font-semibold rounded-md" onClick={handleClose}>Done</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Receipt_Pop;
