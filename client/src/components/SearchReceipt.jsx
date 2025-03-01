import React, { useEffect, useState } from 'react';
import PrintReceipt from './PrintReceipt';
// import { post } from '../../../api/routes/userRoute';
import { Link } from 'react-router-dom';
import Popup from './Popup';

const SearchReceipt = ({ types, isDeliveryMode }) => {

    const [userMessage, setUserMessage] = useState("");
    const [popupType, setPopupType] = useState("success");

    const [searchVal, setSearchVal] = useState('');
    const [ token, setToken ] = useState(null);
    const [originalBill, setOriginalBill] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        village: '',
        date: '',
        phone: '',
        type: "",
        weight: '',
        rate: '',
        ghat: '',
        bhusa: '',
        dal: '',
        reduceBill: '',
        bill: '',
        isDelivered : false,
    });

    const handleSearchReceipt = async () => {
        if (!searchVal.trim()) return;
        try {

            const storedToken = localStorage.getItem("token");
            if (!storedToken) throw new Error("User Is Not Authorized!");
            
            setToken(storedToken);

            const response = await fetch(`http://localhost:5001/api/bills/${searchVal}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch receipt.");

            const data = await response.json();
            console.log(data)
            setFormData(data);
            setOriginalBill(data.bill);

        } catch (error) {
            console.error('Error fetching the receipt:', error);
        }
    };

    const handleReduceBill = (e) => {
        const reducedAmount = Number(e.target.value) || 0;
        setFormData((prevData) => ({
            ...prevData,
            reduceBill: reducedAmount,
            bill: originalBill - reducedAmount, 
        }));
    };

    const handleDelivery = async () => {
        setShowConfirmModal(true); // Show confirmation modal
    };

    const confirmDelivery = async (e) => {
        e.preventDefault();
        setShowConfirmModal(false); // Hide modal
        console.log("Handling delivery...");
    
        try {
            console.log(formData);
            const updatedFormData = { ...formData, isDelivered: true };
            console.log(formData);
    
            console.log("Sending updatedFormData:", updatedFormData);
    
            const res = await fetch(`http://localhost:5001/api/bills/${searchVal}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedFormData),
            });
    
            const data = await res.json(); // Always parse JSON response
    
            if (!res.ok) throw new Error(data.error || "Failed to deliver bill");
    
            setUserMessage(data.message || "Bill Delivered successfully!");
            setPopupType("success");
    
            setTimeout(() => {
                setUserMessage("");
            }, 3000);
    
            setFormData(data.bill); // Update form data with the latest response
            console.log("Dal delivered successfully:", data);
        } catch (err) {
            setUserMessage(err.message || "Error delivering bill");
            setPopupType("error");
            console.log("Error:", err);
        }
    };
    

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            type: types
        }));
        console.log(searchVal);
        setToken(localStorage.getItem("token"));
    }, [searchVal, types]);

    return (
        <div className="w-full p-8">
            <div className="search flex flex-col items-center">
                <h2 className="font-bold text-center text-2xl border-b-2 p-2 rounded-sm border-blue-500 my-4 shadow-md capitalize">{isDeliveryMode ? "Deliver Order" : `Search ${types? types : ""} Receipt`}</h2>
                <div className="flex items-center w-full justify-center gap-4">
                    <input
                        type="text"
                        id="searchReceipt" 
                        name="searchReceipt"
                        placeholder='Enter Receipt Id'
                        onChange={(e) => setSearchVal(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                    <button onClick={handleSearchReceipt} type="button" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md">Submit</button>
                </div>
            </div>
            {formData.name && (
                <>
                <div className="availableReceipt">
                    <div className="space-y-4 flex justify-center flex-col mx-4 py-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                readOnly
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="village" className="block text-sm font-medium text-gray-700">Village</label>
                            <input
                                type="text"
                                id="village"
                                name="village"
                                value={formData.village}
                                readOnly
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="group flex gap-2 w-full">
                            <div className='w-1/2'>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    readOnly
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="text"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="group flex gap-2 w-full">
                            <div className="w-1/2">
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    readOnly
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    value={formData.weight}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="group flex gap-2 w-full">
                            <div className="w-1/2">
                                <label htmlFor="dal" className="block text-sm font-medium text-gray-700">Dal</label>
                                <input
                                    type="number"
                                    id="dal"
                                    name="dal"
                                    value={formData.dal}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    readOnly
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="bhusa" className="block text-sm font-medium text-gray-700">Bhusa</label>
                                <input
                                    type="number"
                                    id="bhusa"
                                    name="bhusa"
                                    value={formData.bhusa}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="group flex gap-2 w-full">
                            <div className="w-1/2">
                                <label htmlFor="bill" className="block text-sm font-medium text-gray-700">Bill</label>
                                <input
                                    type="number"
                                    id="bill"
                                    name="bill"
                                    value={formData.bill}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    readOnly
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Rate</label>
                                <input
                                    type="number"
                                    id="rate"
                                    name="rate"
                                    value={formData.rate}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="group flex gap-2 w-full">
                            <div className={`${isDeliveryMode? 'w-1/2' : 'w-full'}`}>
                                <label htmlFor="ghat" className="block text-sm font-medium text-gray-700">Ghat</label>
                                <input
                                    type="number"
                                    id="ghat"
                                    name="ghat"
                                    value={formData.ghat}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    readOnly
                                />
                            </div>
                            {
                                isDeliveryMode && (
                                    <div className="w-1/2">
                                        <label htmlFor="reduceBill" className="block text-sm font-medium text-gray-700">Reduce Bill</label>
                                        <input 
                                            type="number" 
                                            id="reduceBill" 
                                            name="reduceBill" 
                                            value={formData.reduceBill || ''} 
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                                            readOnly={!isDeliveryMode} 
                                            onChange={handleReduceBill} 
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="printReceipt flex justify-center w-full gap-2">
                {isDeliveryMode &&
                <div className="w-1/2 mx-auto">
                        <button type="button" onClick={handleDelivery} className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md w-full">Deliver</button>
                    </div>
                }
                    <div className="w-1/2 mx-auto">
                        <PrintReceipt formData={formData} />
                    </div>
                </div>
                </>
            )}

            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold text-gray-900">Confirm Delivery</h3>
                        <p className="text-gray-700 mt-2">Are you sure you want to mark this order as delivered?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelivery}
                                className="px-4 py-2 bg-green-600 text-white rounded-md"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {userMessage && <Popup message={userMessage} type={popupType} onClose={() => setUserMessage("")} />}

        </div>
    );
};

export default SearchReceipt;
