import React, { useState } from "react";

const UserTable = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.bill.includes(searchTerm)||
        item.village.includes(searchTerm) ||
        item.weight.includes(searchTerm)||
        item.isDelivered.toString().toLowerCase().includes(searchTerm.toLowerCase())||
        item._id.includes(searchTerm)
    );

    return (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">User Transactions</h2>
            <input
                type="text"
                placeholder="Search by name, phone, or bill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Sr.No.</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Village</th>
                            <th className="border border-gray-300 p-2">Phone</th>
                            <th className="border border-gray-300 p-2">Date</th>
                            <th className="border border-gray-300 p-2">Type</th>
                            <th className="border border-gray-300 p-2">Weight</th>
                            <th className="border border-gray-300 p-2">Dal</th>
                            <th className="border border-gray-300 p-2">Bill</th>
                            <th className="border border-gray-300 p-2">Delivered</th>
                            <th className="border border-gray-300 p-2">Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, i) => (
                            <tr key={item._id}>
                                <td className="border border-gray-300 p-2">{i + 1}</td>
                                <td className="border border-gray-300 p-2">{item.name}</td>
                                <td className="border border-gray-300 p-2">{item.village}</td>
                                <td className="border border-gray-300 p-2">{item.phone}</td>
                                <td className="border border-gray-300 p-2">{item.date}</td>
                                <td className="border border-gray-300 p-2">{item.type}</td>
                                <td className="border border-gray-300 p-2">{item.weight}</td>
                                <td className="border border-gray-300 p-2">{item.dal}</td>
                                <td className="border border-gray-300 p-2">{item.bill}</td>
                                <td className="border border-gray-300 p-2">{item.isDelivered ? "Yes" : "No"}</td>
                                <td className="border border-gray-300 p-2">{item._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
