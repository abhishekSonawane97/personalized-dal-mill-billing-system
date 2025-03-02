import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Cell } from "recharts";
import UserTable from "../components/UserTable";
const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Vite


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Colors for Pie Chart

const Analytics = () => {
    const [data, setData] = useState([]);
    const [grainTypeData, setGrainTypeData] = useState([]);

    const getAllBills = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authorized!");

            const res = await fetch(`${BASE_URL}/bills`, {
                method: "GET",
                headers: {
                    "Content-Type": "Application/JSON",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch receipt.");

            const { bills } = await res.json();
            setData(bills);

            // ✅ Calculate total weight per grain type
            const grainTypeStats = bills.reduce((acc, item) => {
                if (!acc[item.type]) {
                    acc[item.type] = { name: item.type, totalWeight: 0, totalDal: 0, totalBhusa: 0, totalRaw: 0, deliveredDal: 0 };
                }
                acc[item.type].totalWeight += Number(item.weight);
                acc[item.type].totalDal += Number(item.dal);
                acc[item.type].totalBhusa += Number(item.bhusa);
                acc[item.type].totalRaw += Number(item.weight);
                if (item.isDelivered) acc[item.type].deliveredDal += Number(item.dal);
                return acc;
            }, {});

            setGrainTypeData(Object.values(grainTypeStats));
        } catch (err) {
            console.error("Error fetching the receipts:", err);
        }
    };

    useEffect(() => {
        getAllBills();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-center text-4xl font-bold p-8 bg-indigo-400 text-white">Dal Analytics Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Raw Material vs Dal Production</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={grainTypeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalRaw" fill="#8884d8" name="Total Raw Material" />
                            <Bar dataKey="totalDal" fill="#82ca9d" name="Total Dal" />
                            <Bar dataKey="totalBhusa" fill="#FFBB28" name="Total Bhusa" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Grain Type Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={grainTypeData} dataKey="totalWeight" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label={({ name, value }) => `${name}: ${value} kg`}>
                                {grainTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name, props) => [`${value} kg`, props.payload.name]} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                <h2 className="text-xl font-semibold mb-4">Delivered vs Pending Dal</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={grainTypeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalDal" fill="#FF5733" name="Total Dal" />
                        <Bar dataKey="deliveredDal" fill="#4CAF50" name="Delivered Dal" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                <h2 className="text-xl font-semibold mb-4">Revenue Trends Over Time</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="bill" stroke="#ff7300" name="Revenue" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <UserTable data={data} />
        </div>
    );
};

export default Analytics;
