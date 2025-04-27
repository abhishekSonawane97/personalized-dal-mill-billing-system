import React from 'react';
import { useEffect } from "react";
import PrintReceipt from './PrintReceipt';


const Receipt_Pop = ({ formData, onClose }) => {


    useEffect(() => {
        // Play bell sound when popup appears
        // bellSound.play().catch((err) => console.error("Audio playback error:", err));

        // Close on Escape key
        const closeOnEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [onClose]);



  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[fit-cotnent]" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-1 right-0 text-gray-600 hover:text-black" onClick={onClose}>✖</button>
                <div className="flex items-center flex-col space-x-3">
                    <PrintReceipt formData={formData} />
                    <div className="btns flex gap-2">
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md" onClick={onClose}>Print Receipt</button>
                    <button className="mt-4 px-8 py-2 bg-blue-600 text-white font-semibold rounded-md" onClick={onClose}>Done</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Receipt_Pop;