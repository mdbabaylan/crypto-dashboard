import React from "react";
import MarketCapComparison from "./MarketCapComparison";


function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-center p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Crypto Dashboard
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          BTC as #1, and a rough gauge on DeFi Altcoins vs Top 10 memecoins
        </p>
      </div>
      <div className="mt-10">
        { <MarketCapComparison />}
      </div>

    </div>
  );
}

export default App;
