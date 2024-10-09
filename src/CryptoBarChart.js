import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for 24H Percentage Change
const data = [
  { name: 'BTC', change: 2.5 },   // 2.5% 24H change for Bitcoin
  { name: 'ETH', change: 3.8 },   // 3.8% 24H change for Ethereum
  { name: 'WIF', change: -1.2 },  // -1.2% 24H change for WIF
  { name: 'PEPE', change: 4.1 },  // 4.1% 24H change for PEPE
];

function CryptoBarChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="change" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CryptoBarChart;
