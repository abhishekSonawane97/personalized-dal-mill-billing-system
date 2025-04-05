import React, { useEffect, useState } from 'react';
import PrintReceipt from './PrintReceipt';
import { Link } from 'react-router-dom';
import Popup from './Popup';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchReceipt = ({ types, isDeliveryMode }) => {
    const [userMessage, setUserMessage] = useState("");
    const [popupType, setPopupType] = useState("success");
    const [searchTerm, setSearchTerm] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [data, setData] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [originalBill, setOriginalBill] = useState(0);
    
    const [formData, setFormData] = useState({
        name: '', village: '', date: '', phone: '', type: "",
        weight: '', rate: '', ghat: '', bhusa: '', dal: '',
        reduceBill: '', bill: '', isDelivered: false,
    });

    useEffect(() => {
        setFormData(prev => ({ ...prev, type: types }));
        fetchAllBills();
    }, [types]);

    const fetchAllBills = async () => {
        if (!token) return;
        try {
            const res = await fetch(`${BASE_URL}/bills`, {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Failed to fetch bills.");
            const { bills } = await res.json();
            setData(bills);
        } catch (err) {
            console.error("Error fetching receipts:", err);
        }
    };

    const confirmDelivery = async () => {
        
        setShowConfirmModal(false);
        try {
            const updatedData = { ...formData, isDelivered: true };
            const res = await fetch(`${BASE_URL}/bills/${formData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(updatedData),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to update bill");

            setUserMessage("Bill Delivered successfully!");
            setPopupType("success");

            setTimeout(() => setUserMessage(""), 3000);
            setFormData(result.bill);

            await fetchAllBills();

        } catch (err) {
            setUserMessage(err.message || "Error delivering bill");
            setPopupType("error");
        }
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.bill.includes(searchTerm) ||
        item.village.includes(searchTerm) ||
        item.weight.includes(searchTerm) ||
        item.isDelivered.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item._id.includes(searchTerm)
    );

    return (
        <div className="w-full p-8">
            <h2 className="text-2xl font-bold text-center mb-4">
                {isDeliveryMode ? "Deliver Order" : `Search ${types || ""} Receipt`}
            </h2>
            <input
                type="text"
                placeholder="Search by name, phone, or bill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded w-full mb-4"
            />
            {filteredData.length > 0 && searchTerm &&
             (
                <table className="w-full border border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            {['Sr.No.', 'Name', 'Village', 'Phone', 'Date', 'Type', 'Weight', 'Dal', 'Bill', 'Delivered', 'Id'].map((heading, i) => (
                                <th key={i} className="border p-2">{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, i) => (
                            <tr key={item._id} onClick={() => setFormData(item)} className='cursor-pointer'>
                                <td className="border p-2">{i + 1}</td>
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.village}</td>
                                <td className="border p-2">{item.phone}</td>
                                <td className="border p-2">{item.date}</td>
                                <td className="border p-2">{item.type}</td>
                                <td className="border p-2">{item.weight}</td>
                                <td className="border p-2">{item.dal}</td>
                                <td className="border p-2">{item.bill}</td>
                                <td className="border p-2">{item.isDelivered ? "Yes" : "No"}</td>
                                <td className="border p-2">{item._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {formData.name && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Receipt Details</h3>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Village:</strong> {formData.village}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>Date:</strong> {formData.date}</p>
                    <p><strong>Bill:</strong> {formData.bill}</p>
                    {isDeliveryMode && (
                        <button onClick={() => setShowConfirmModal(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                            Deliver
                        </button>
                    )}
                    <PrintReceipt formData={formData} />
                </div>
            )}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3>Confirm Delivery</h3>
                        <p>Are you sure you want to mark this order as delivered?</p>
                        <button onClick={() => setShowConfirmModal(false)} className="mr-4">Cancel</button>
                        <button onClick={confirmDelivery} className="bg-blue-600 text-white px-4 py-2 rounded">Confirm</button>
                    </div>
                </div>
            )}
            {userMessage && <Popup type={popupType} message={userMessage} />}
        </div>
    );
};

export default SearchReceipt;
