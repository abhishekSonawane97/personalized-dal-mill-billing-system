import React, { useContext, useRef } from 'react';
import { UserContext } from '../context/UserProvider';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PrintReceipt = ({ formData }) => {
    const { user } = useContext(UserContext);
    const receiptRef = useRef(null);

    const handleGeneratePDF = async () => {
        const receiptElement = receiptRef.current;
        const canvas = await html2canvas(receiptElement, { scale: 3 });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        pdf.save('receipt.pdf');
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <div className="receipt-container" ref={receiptRef} style={{ width: '210mm', height: '297mm', padding: '20mm', border: '2px solid black', background: '#fff' }}>
                {/* Header */}
                <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <img src="/sai_mill_logo.png" style={{ width: '80px', height: '80px' }} />
                    <div className="header-title" style={{ textAlign: 'center', flexGrow: 1 }}>
                        <h1 style={{ fontSize: '24px', margin: '0' }}>!! साई दाळ मिल !!</h1>
                        <p style={{ fontSize: '14px', margin: '0' }}>आम्ही आपल्या सेवेसाठी सदैव तत्पर आहोत!</p>
                    </div>
                </div>

                {/* Customer Info in 2/2 layout */}
                <div className="info" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                    <p><strong>नाव:</strong> {formData.name}</p>
                    <p><strong>गाव:</strong> {formData.village}</p>
                    <p><strong>दिनांक:</strong> {formData.date}</p>
                    <p><strong>फोन:</strong> {formData.phone}</p>
                </div>

                {/* Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <tbody>
                        <tr><th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>प्रकार</th><td style={{ border: '1px solid black', padding: '8px' }}>{formData.type}</td></tr>
                        <tr><th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>वजन</th><td style={{ border: '1px solid black', padding: '8px' }}>{formData.weight}</td></tr>
                        <tr><th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>दर</th><td style={{ border: '1px solid black', padding: '8px' }}>{formData.rate}</td></tr>
                        <tr><th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>घट</th><td style={{ border: '1px solid black', padding: '8px' }}>{formData.ghat}</td></tr>
                        <tr><th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>भुशा</th><td style={{ border: '1px solid black', padding: '8px' }}>{formData.bhusa}</td></tr>
                        <tr><th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>डाळ</th><td style={{ border: '1px solid black', padding: '8px' }}>{formData.dal}</td></tr>
                        <tr><th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>कमी बिल</th><td style={{ border: '1px solid black', padding: '8px' }}>{formData.reduceBill}</td></tr>
                        <tr><th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>एकूण बिल</th><td style={{ border: '1px solid black', padding: '8px' }}>{formData.bill}</td></tr>
                    </tbody>
                </table>

                {/* Footer with enhanced styles */}
                <div className="footer" style={{ marginTop: '20px', textAlign: 'left', fontSize: '16px', fontWeight: 'bold', padding: '10px'}}>
                    <p>आपल्या व्यवहारासाठी मनःपूर्वक धन्यवाद!</p>
                </div>
                <div className="footer" style={{ marginTop: '20px', textAlign: 'left', fontSize: '16px', fontWeight: 'bold', padding: '10px',borderBottom:"80px solid grey",
                paddingBottom: "5px",
                display:"flex", justifyContent:"space-between", alignItems: "center",
                 }}>
                    <p>
                        Delevered By : 
                    </p>
                    <img src="/sai_mill_logo.png" style={{ width: '80px', height: '80px' }} />
                </div>
                <div className="footer" style={{textAlign:"center"}}
                >
                    <h1 style={{ fontWeight:"700", fontSize:"29px", }}
                    >- sai Gramin Udyog - </h1>
                    <p style={{ fontWeight:"700", fontSize:"20px", }}
                    >Kingaon Fata, Phulambri-Khultabad Road </p>
                </div>
            </div>

            {/* PDF Button */}
            <button onClick={handleGeneratePDF} className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md">
                PDF डाउनलोड करा
            </button>
        </div>
    );
};

export default PrintReceipt;
