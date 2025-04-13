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

    console.log("formData : ", formData)

    return (
        <div className='w-full flex flex-col items-center'>
            <div className="receipt-container" ref={receiptRef} style={{ width: '210mm', height: '297mm', padding: '5mm 5mm 0mm 5mm', border: '2px solid black', background: '#fff' }}>
            <p style={{ textAlign: "right", fontSize:"18px", fontWeight: "700", margin:"20px 0" }} >{formData._id}</p>
                {/* Header */}
                <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '10px' }}>
                    <img src="/sai_mill_logo.png" style={{ width: '220px', height: '220px', marginTop: "-45px" }} />
                    <div className="header-title" style={{ textAlign: 'center', paddingLeft:"20px" }}>
                        <h1 style={{ fontSize: '64px', margin: '0', fontWeight: "900" }}>!! साई दाळ मिल !!</h1>
                        <p style={{ fontSize: '18px', margin: '10px', fontWeight: "700" }}>हळवटी मळा, किंगाव फाटा, फुलंब्री खुलताबाद रोड</p>
                    </div>
                </div>
                <div className="numbers" style={{ fontSize: '18px', margin: '0', fontWeight: "700", display:"flex", alignItems: "flex-end" , paddingRight: "8%" }}>
                <p style={{ fontSize: '18px', margin: '10px', textAlign:"left", width:"100%" }}>- बिना पॉलिश, केमिकल मुक्त, चवदार -</p>
                <div>
                    <p style={{whiteSpace:"nowrap", borderBottom: "1px solid black" }} >+91 8007771564</p>
                    <p style={{whiteSpace:"nowrap",  borderBottom: "1px solid black"}}>+91 7083301592</p>
                    </div>
                </div>
                {/* Table */}
                <table style={{ width: '110mm', borderCollapse: 'collapse', margin:"20px auto auto auto", fontSize:"18px"}}>
                    <tbody>
                    <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>दिनांक</td>
                    <td style={{ border: '1px solid black', padding: '8px',width:"280px" }}>{formData.date}</td>
                    </tr>
                    <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>नाव</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{formData.name}</td>
                    </tr>
                    <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>गाव</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{formData.village}</td>
                    </tr>
                    <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>फोन</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{formData.phone}</td>
                    </tr>

                        <tr style={{width: "max-content"}}><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left', width:"150px" }}>प्रकार</td><td style={{ border: '1px solid black', padding: '8px' }}>{formData.type}</td></tr>
                        <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>वजन</td><td style={{ border: '1px solid black', padding: '8px' }}>{formData.weight}</td></tr>
                        <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>दर</td><td style={{ border: '1px solid black', padding: '8px' }}>{formData.rate}</td></tr>
                        <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>घट</td><td style={{ border: '1px solid black', padding: '8px' }}>{formData.ghat}</td></tr>
                        <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>भुशा</td><td style={{ border: '1px solid black', padding: '8px' }}>{formData.bhusa}</td></tr>
                        <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>दाळ</td><td style={{ border: '1px solid black', padding: '8px' }}>{formData.dal}</td></tr>
                        <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>कमी बिल</td><td style={{ border: '1px solid black', padding: '8px' }}>{formData.reduceBill}</td></tr>
                        <tr><td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>एकूण बिल</td><td style={{ border: '1px solid black', padding: '8px' }}>{formData.bill}</td></tr>
                    </tbody>
                </table>

                {/* Footer with enhanced styles */}
                
                <div className="footer" style={{ marginTop: '20px', textAlign: 'left', fontSize: '16px', fontWeight: '400', padding: '10px',
                paddingBottom: "5px",
                display:"flex", justifyContent:"space-between", alignItems: "center", width:"92%"
                 }}>
                    <p style={{ fontSize: '18px', margin: '0', paddingLeft:"15px" }}>आम्ही आपल्या सेवेसाठी सदैव तत्पर आहोत !</p>
                    <p style={{ fontSize: '18px', margin: '0', paddingLeft: "5%" }}>
                        वितरित केले: 
                    </p>
                    {/* <img src="/sai_mill_logo.png" style={{ width: '80px', height: '80px' }} /> */}
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
