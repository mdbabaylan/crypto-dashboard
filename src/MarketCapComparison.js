import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function MarketCapComparison() {
  const [marketCapData, setMarketCapData] = useState([]);

  useEffect(() => {
    // Function to fetch market cap data for BTC, DeFi, and Memecoins
    const fetchMarketCaps = async () => {
      try {
        // Fetch BTC Market Cap
        const btcResponse = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true'
        );
        const btcMarketCap = btcResponse.data.bitcoin.usd_market_cap;

        // Fetch DeFi Market Cap
        const defiResponse = await axios.get('https://api.coingecko.com/api/v3/global/decentralized_finance_defi');
        const defiMarketCap = defiResponse.data.data.defi_market_cap;

        // Fetch Global Market Cap for Memecoins
        const globalResponse = await axios.get('https://api.coingecko.com/api/v3/global');
        const memecoinMarketCap = globalResponse.data.data.market_cap_percentage.dogecoin + globalResponse.data.data.market_cap_percentage.shiba_inu;

        // Format the data for the chart
        const formattedData = [
          { name: 'BTC', marketCap: btcMarketCap },
          { name: 'DeFi', marketCap: defiMarketCap },
          { name: 'Memecoins', marketCap: memecoinMarketCap },
        ];

        setMarketCapData(formattedData);
      } catch (error) {
        console.error('Error fetching market cap data:', error);
      }
    };
      //use https://api.coingecko.com/api/v3/coins/categories, get memecoins
    fetchMarketCaps();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={marketCapData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `$${(value / 1e9).toFixed(1)}B`} />
        <Tooltip formatter={(value) => `$${(value / 1e9).toFixed(2)} Billion`} />
        <Bar dataKey="marketCap" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MarketCapComparison;
