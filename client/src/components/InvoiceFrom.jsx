import React, { useEffect, useState, useRef } from 'react';
import PrintReceipt from './PrintReceipt';
import { Link } from 'react-router-dom';

const InvoiceForm = ({types}) => {

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    types = 'toor';
    const [formData, setFormData] = useState({
        name: '',
        village: '',
        date: formattedDate,
        phone : '',
        type : types,
        weight: '',
        rate: '',
        ghat: '',
        bhusa: '',
        dal: '',
        reduceBill : '',
        bill: ''
    });
    // console.log('formattedDate : ', formattedDate);

    const receiptRef = useRef();
    const [error, setError ] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => {
            const updatedData = { ...prevData, [name]: value };
            if (name === 'weight' || name === 'rate') {
                updatedData.dal = 0.7 * Number(updatedData.weight);
                updatedData.bhusa = 0.28 * Number(updatedData.weight);
                updatedData.ghat = Number(updatedData.weight) - Number(updatedData.dal) - Number(updatedData.bhusa);
                updatedData.bill = Number(updatedData.weight) * Number(updatedData.rate);
            }
            return updatedData;
        });
        console.log('change...', formData);
    };

    const handleGetDetail = () => {
        setFormData(prevData => ({
            ...prevData,
            dal :  0.7 * Number(prevData.weight),
            bhusa : 0.28 * Number(prevData.weight) ,
            ghat : Number(prevData.weight) - Number(prevData.dal) - Number(prevData.bhusa),
            bill : Number(prevData.weight) * Number(prevData.rate),
            bill: Number(prevData.bill) - Number(prevData.reduceBill)
        }));
        console.log(formData)
    };



      const handleSubmit = async(e) => {
    
        setError('');
        if ( !formData.name ||!formData.village ||!formData.date ||!formData.phone  ||!formData.type ||!formData.weight ||!formData.rate ||!formData.ghat ||!formData.bhusa ||!formData.dal ||!formData.reduceBill  ||!formData.bill ) {
            console.log('object', formData, name,village,date,phone,type,weight,rate,ghat,bhusa,dal,reduceBill,bill)
            setError('Please fill in all fields.');
            return;
        }
    
        let res = await fetch('http://localhost:5001/api/bills', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        console.log('object', res)
        if (res.ok) {
            res = await res.json();
        } else {
            setError('Login failed. Please try again.');
            console.error("Failed to login:", res.status, res.statusText, error);
        }
    
        console.log( 'name :', name ,"Email:", email, "Password:", password);
        alert('Logged in successfully!');
      };



    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            type: types // Update the type with the new value of `types`
        }));
    }, [types]);
   return (
    <>
    <div className="invoiceForm relative p-8">
        <div className="contact absolute right-12 top-0 left-auto flex flex-col"><span>Phone : 9403075482</span><span>Phone : 8007771564</span></div>
        <h2 className="font-bold text-center text-2xl border-b-2 p-2 rounded-sm border-blue-500 my-4 shadow-md capitalize">{types} Dal Invoice</h2>
    </div>
    
    <div className="availableReceipt p-8" ref={receiptRef}>
            <form className="space-y-4 flex justify-center flex-col mx-4 py-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="village" className="block text-sm font-medium text-gray-700">village</label>
                    <input
                        type="text"
                        id="village"
                        name="village"
                        value={formData.village}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
    <div className="group flex gap-2 w-full">
    <div className="w-1/2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">phone</label>
                    <input
                        type="phone"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="w-1/2">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        value={formData.date}
                        // onChange={handleChange}
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
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
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
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="w-1/2">
                    <label htmlFor="bhusa" className="block text-sm font-medium text-gray-700">Bhusa</label>
                    <input
                        type="number"
                        id="bhusa"
                        name="bhusa"
                        value={formData.bhusa}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
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
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="w-1/2">
                    <label htmlFor="reduceBill" className="block text-sm font-medium text-gray-700">Reduce Bill</label>
                    <input
                        type="number"
                        id="reduceBill"
                        name="reduceBill"
                        value={formData.reduceBill}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="w-1/2">
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Rate</label>
                    <input
                        type="number"
                        id="rate"
                        name="rate"
                        value={formData.rate}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                </div>
                <div className="group flex gap-2 w-full">
                    <div className="w-1/2 mx-auto">
                        <button type="button" onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md w-full">Submit</button>
                    </div>
                    <div className="w-1/2 mx-auto">
                        <button  type="button" onClick={handleGetDetail} className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md w-full">Get Details</button>
                    </div>
                </div>
            </form>
    </div>
    <div className="printReceipt flex justify-center w-full">
        <PrintReceipt formData={formData} />
    </div>
        </>
    );
};


export default InvoiceForm
