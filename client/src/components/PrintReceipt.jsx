// ReceiptPrinter.js
import React, { useRef } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const PrintReceipt = ({ formData }) => {
    const receiptRef = useRef(); // Reference for the receipt content
    const { user } = useContext(UserContext);

    const handlePrint = (e) => {
        e.preventDefault();
        const printWindow = window.open('', '_blank', 'width=600,height=600');

        if (printWindow) {
            printWindow.document.write(`
                <html>
                <head>
                    <title>Receipt</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 15px; }
                        h1 { text-align: center; }
                        .receipt { padding: 20px; border: 2px solid #333; border-radius: 8px; width: 90%; margin: auto; }
                        .header { text-align: center; margin-bottom: 15px; }
                        .header h1 { margin: 0; }
                        .header p { margin: 5px 0; font-weight: bold; }
                        .info-section { display: flex; justify-content: space-between; margin-bottom: 15px; }
                        .info-section div { flex: 1; }
                        .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        .table th, .table td { border: 1px solid #333; padding: 8px; text-align: left; }
                        .table th { background: #f4f4f4; }
                        .footer { margin-top: 20px; text-align: center; border-top: 1px solid #ccc; padding-top: 10px; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <div class="header">
                            <div style="display:flex; justify-content:space-between;"><span>Phone: 9403075482</span><span>Phone: 8007771564</span></div>
                            <h1>!! साई दाळ मिल !!</h1>
                            <p>आम्ही आपल्या सेवेसाठी सदैव तत्पर आहोत!</p>
                        </div>
                        <div class="info-section">
                            <div><strong>Name:</strong> ${formData.name}</div>
                            <div><strong>Date:</strong> ${formData.date}</div>
                        </div>
                        <div class="info-section">
                            <div><strong>Village:</strong> ${formData.village}</div>
                            <div><strong>Phone:</strong> ${formData.phone}</div>
                        </div>
                        <table class="table">
                            <tr><th>Type</th><td>${formData.type}</td></tr>
                            <tr><th>Weight</th><td>${formData.weight}</td></tr>
                            <tr><th>Rate</th><td>${formData.rate}</td></tr>
                            <tr><th>Ghat</th><td>${formData.ghat}</td></tr>
                            <tr><th>Bhusa</th><td>${formData.bhusa}</td></tr>
                            <tr><th>Dal</th><td>${formData.dal}</td></tr>
                            <tr><th>Reduce Bill</th><td>${formData.reduceBill}</td></tr>
                            <tr><th>Total Bill</th><td>${formData.bill}</td></tr>
                        </table>
                        <div class="info-section">
                            <div style="margin:10px 5px;"><strong>Delivered By:</strong> ${user?.name || ''}</div>
                        </div>
                        <div class="footer">
                            <p>आपल्या व्यवहारासाठी मनःपूर्वक धन्यवाद! आम्ही आपल्या सेवेसाठी सदैव तत्पर आहोत!</p>
                        </div>
                    </div>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    };

    return (
        <div ref={receiptRef} className='w-full flex justify-center'>
            <button type="button"
                onClick={handlePrint}
                className="mt-4 px-4 py-2 w-full bg-blue-600 text-white font-semibold rounded-md mx-auto">
                Print
            </button>
        </div>
    );
};

export default PrintReceipt;
