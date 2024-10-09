import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CryptoData() {
  const [btcData, setBtcData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the CoinGecko API
  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd'
      );
      setBtcData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the crypto data: ", error);
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCryptoData();
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Crypto Prices</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {btcData ? (
            <>
              <li>Bitcoin (BTC): ${btcData.bitcoin.usd}</li>
              <li>Ethereum (ETH): ${btcData.ethereum.usd}</li>
              <li>Cardano (ADA): ${btcData.cardano.usd}</li>
            </>
          ) : (
            <p>Error fetching data</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default CryptoData;
