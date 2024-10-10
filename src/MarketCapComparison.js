import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MarketCapComparison() {
  const [marketCapData, setMarketCapData] = useState([]);

  useEffect(() => {
    const fetchMarketCaps = async () => {
      try {
        // Fetch 7D historical market cap for DeFi
        const defiResponse = await axios.get(
          'https://api.coingecko.com/api/v3/global/decentralized_finance_defi'
        );
        const defiMarketCap = defiResponse.data.data.defi_market_cap;

        // Fetch 7D historical market cap for Memecoins
        const memeResponse = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              ids: 'dogecoin,shiba-inu',
              order: 'market_cap_desc',
              sparkline: true,
            },
          }
        );
        
        // Extract 7-day market cap data for each memecoin (e.g., Dogecoin and Shiba Inu)
        const memeMarketCap = memeResponse.data.reduce((acc, coin) => {
          coin.sparkline_in_7d.price.forEach((value, index) => {
            acc[index] = (acc[index] || 0) + value * coin.circulating_supply;
          });
          return acc;
        }, []);

        // Format the data for the chart (assuming 7-day trends)
        const formattedData = memeMarketCap.map((memeValue, index) => ({
          name: `Day ${index + 1}`,
          Defi: defiMarketCap,
          Memecoins: memeValue,
        }));

        setMarketCapData(formattedData);
      } catch (error) {
        console.error('Error fetching market cap data:', error);
      }
    };

    fetchMarketCaps();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={marketCapData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `$${(value / 1e9).toFixed(1)}B`} />
        <Tooltip formatter={(value) => `$${(value / 1e9).toFixed(2)} Billion`} />
        <Legend />
        <Line type="monotone" dataKey="Defi" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Memecoins" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MarketCapComparison;
