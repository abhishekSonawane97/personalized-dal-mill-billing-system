import React, { useRef } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const PrintReceipt = ({ formData }) => {
    const { user } = useContext(UserContext);

    const handlePrint = (e) => {
        e.preventDefault();

        // Create an iframe for printing
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0px';
        iframe.style.height = '0px';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(`
            <html>
            <head>
                <title>Receipt</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        background: #fff;
                        margin: 0;
                        padding: 10px;
                    }
                    .receipt {
                        width: 90%;
                        max-width: 600px;
                        margin: auto;
                        padding: 20px;
                        border: 2px solid #333;
                        border-radius: 8px;
                        overflow: hidden;
                        word-break: break-word;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 15px;
                    }
                    .header h1 {
                        font-size: 20px;
                        margin: 5px 0;
                    }
                    .info-section {
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        margin-bottom: 10px;
                    }
                    .info-section div {
                        flex: 1;
                        min-width: 45%;
                        padding: 5px;
                    }
                    .table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                    }
                    .table th, .table td {
                        border: 1px solid #333;
                        padding: 6px;
                        text-align: left;
                        font-size: 14px;
                        word-break: break-word;
                    }
                    .footer {
                        margin-top: 15px;
                        text-align: center;
                        border-top: 1px solid #ccc;
                        padding-top: 10px;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    @media print {
                        body {
                            visibility: hidden;
                        }
                        .receipt {
                            visibility: visible;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            margin: 0 auto;
                            padding: 20px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="receipt">
                    <div class="header">
                        <div style="display:flex; justify-content:space-between;">
                            <span>Phone: 9403075482</span><span>Phone: 8007771564</span>
                        </div>
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
        doc.close();

        // Wait for content to load before printing
        iframe.onload = () => {
            setTimeout(() => {
                iframe.contentWindow.print();
                document.body.removeChild(iframe);
            }, 500); // Slight delay to ensure content is fully loaded
        };
    };

    return (
        <div className='w-full flex justify-center'>
            <button type="button"
                onClick={handlePrint}
                className="mt-4 px-4 py-2 w-full bg-blue-600 text-white font-semibold rounded-md mx-auto">
                Print
            </button>
        </div>
    );
};

export default PrintReceipt;
