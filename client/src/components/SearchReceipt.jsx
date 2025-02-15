import React, { useEffect, useState } from 'react';
import PrintReceipt from './PrintReceipt'; // Make sure to adjust the path as necessary

const SearchReceipt = ({ types }) => {
    const [searchVal, setSearchVal] = useState('');
    const [formData, setFormData] = useState({
        name: 'a',
        village: '',
        date: '',
        phone: '',
        type: '',
        weight: '',
        rate: '',
        ghat: '',
        bhusa: '',
        dal: '',
        reduceBill: '',
        bill: ''
    });

    const handleSearchReceipt = async () => {
        console.log('handleSearchReceipt: ', searchVal);
    
        try {
            // Replace with your actual API endpoint
            const response = await fetch(`https://api.example.com/receipts?search=${searchVal}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFormData(data);

        } catch (error) {
            console.error('Error fetching the receipt:', error);
        }
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            type: types
        }));
        console.log(searchVal);
    }, [searchVal, types]);

    return (
        <div className="w-full p-8">
            <div className="search flex flex-col items-center">
                <h2 className="font-bold text-center text-2xl border-b-2 p-2 rounded-sm border-blue-500 my-4 shadow-md capitalize">Search {types} Receipt</h2>
                <input
                    type="text"
                    id="searchReceipt"
                    name="searchReceipt"
                    placeholder='Enter Name / Phone Number / Receipt Number'
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                />
                <button onClick={handleSearchReceipt} type="button" className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md">Submit</button>
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
                                    type="date"
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
                            <div className="w-1/2">
                                <label htmlFor="reduceBill" className="block text-sm font-medium text-gray-700">Reduce Bill</label>
                                <input
                                    type="number"
                                    id="reduceBill"
                                    name="reduceBill"
                                    value={formData.reduceBill}
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
                    </div>
                </div>
                <div className="printReceipt flex justify-center w-full">
                    <PrintReceipt formData={formData} />
                </div>
                </>
            )}
        </div>
    );
};

export default SearchReceipt;
