// ReceiptPrinter.js
import React, { useRef } from 'react';

const PrintReceipt = ({ formData }) => {
    const receiptRef = useRef(); // Reference for the receipt content

    const handlePrint = (e) => {
        e.preventDefault();
        const printWindow = window.open('', '_blank', 'width=600,height=600');

        if (printWindow) {
            printWindow.document.write(`
                <html>
                <head>
                    <title>receipt</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h1 { text-align: center; }
                        .receipt { padding: 20px; border: 2px solid #333; border-radius: 8px; }
                        .header { text-align: center; margin-bottom: 20px; }
                        .header h1 { margin: 0; }
                        .header p { margin: 5px 0; }
                        .section { margin-bottom: 15px; display: flex; }
                        .section label { font-weight: bold; width: 50%; }
                        .section p { margin: 5px 0; width: 50%; }
                        .footer { margin-top: 20px; text-align: center; border-top: 1px solid #ccc; padding-top: 10px; }
                        .full-width { width: 100%; } /* For full-width fields */
 </style>
                </head>
                <body                    <div class="receipt" ref={receiptRef}>
                        <div class="header">
                        <div className="contact absolute right-0 top-0 left-auto flex flex-col"><span>Phone : 9403075482 </span><span> Phone : 8007771564</span></div>
                            <h1>Sai Dal Mill</h1>
                            <p>Thank you for your business!</p>
                        </div>
                        <div="section full-width">
                            <label>Name:</label>
                            <p>${formData.name}</p>
                        </div>
                        <div class="section full-width">
                            <label>Village:</label>
                            <p>${formData.village}</p>
                        </div>
                        <div class="section">
                            <label>Date:</label>
                            <p>${formData.date}</p>
                        </div>
                        <div class="section">
                            <label>Phone:</label>
                            <p>${formData.phone}</p>
                        </div>
                        <div class="section">
                            <label>Type:</label>
                            <p>${formData.type}</p>
                        </div>
                        <div class="section">
                            <label>Weight:</label>
                            <p>${formData.weight}</p>
                        </div>
                        <div class="section">
                            <label>Rate:</label>
                            <p>${formData.rate}</p>
                        </div>
                        <div class="section">
                            <label>Ghat:</label>
                            <p>${formData.ghat}</p>
                        </div>
                        <div class="section">
                            <label>Bhusa:</label>
                            <p>${formData.bhusa}</p>
                        </div>
                        <div class="section">
                            <label>Dal:</label>
                            <p>${formData.dal}</p>
                        </div>
                        <div class="section">
                            <label>Reduce Bill:</label>
                            <p>${formData.reduceBill}</p>
                        </div>
                        <div class="section">
                            <label>Bill:</label>
                            <p>${formData.bill}</p>
                        </div>
                        <div class="footer">
                            <p>We appreciate your business!</p>
                        </div>
                    </div>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close(); // Close the print window after printing
        }
    };

    return (
        <div ref={receiptRef} className='w-full flex justify-center'>
            <button type="button"
                onClick={handlePrint}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md w-1/2 mx-auto">Print</button>
        </div>
    );
};

export default PrintReceipt;