import React, { useRef } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PrintReceipt = ({ formData }) => {
    const { user } = useContext(UserContext);
    const receiptRef = useRef(); // Reference for capturing receipt as an image

    const handleDownloadPDF = async (e) => {
        e.preventDefault();

        // Capture the receipt as an image
        const receiptElement = receiptRef.current;
        const canvas = await html2canvas(receiptElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        // Create PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Add image to PDF
        const imgWidth = 190; // Adjust width
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

        // Save as file
        pdf.save('receipt.pdf');
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <div ref={receiptRef} className="p-4 border-2 border-gray-400 rounded-md bg-white w-full max-w-md">
                <div className="text-center font-bold">
                    <div className="flex justify-between"><span>Phone: 9403075482</span><span>Phone: 8007771564</span></div>
                    <h1 className="text-lg">!! साई दाळ मिल !!</h1>
                    <p>आम्ही आपल्या सेवेसाठी सदैव तत्पर आहोत!</p>
                </div>
                <div className="flex justify-between text-sm mt-3">
                    <div><strong>Name:</strong> {formData.name}</div>
                    <div><strong>Date:</strong> {formData.date}</div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                    <div><strong>Village:</strong> {formData.village}</div>
                    <div><strong>Phone:</strong> {formData.phone}</div>
                </div>
                <table className="w-full border mt-3 text-sm">
                    <tbody>
                        <tr><th className="border px-2 py-1">Type</th><td className="border px-2 py-1">{formData.type}</td></tr>
                        <tr><th className="border px-2 py-1">Weight</th><td className="border px-2 py-1">{formData.weight}</td></tr>
                        <tr><th className="border px-2 py-1">Rate</th><td className="border px-2 py-1">{formData.rate}</td></tr>
                        <tr><th className="border px-2 py-1">Ghat</th><td className="border px-2 py-1">{formData.ghat}</td></tr>
                        <tr><th className="border px-2 py-1">Bhusa</th><td className="border px-2 py-1">{formData.bhusa}</td></tr>
                        <tr><th className="border px-2 py-1">Dal</th><td className="border px-2 py-1">{formData.dal}</td></tr>
                        <tr><th className="border px-2 py-1">Reduce Bill</th><td className="border px-2 py-1">{formData.reduceBill}</td></tr>
                        <tr><th className="border px-2 py-1">Total Bill</th><td className="border px-2 py-1">{formData.bill}</td></tr>
                    </tbody>
                </table>
                <div className="text-sm mt-3">
                    <strong>Delivered By:</strong> {user?.name || ''}
                </div>
                <div className="text-center mt-3 text-sm font-semibold border-t border-gray-300 pt-2">
                    <p>आपल्या व्यवहारासाठी मनःपूर्वक धन्यवाद! आम्ही आपल्या सेवेसाठी सदैव तत्पर आहोत!</p>
                </div>
            </div>

            <button type="button"
                onClick={handleDownloadPDF}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md">
                Download PDF
            </button>
        </div>
    );
};

export default PrintReceipt;
