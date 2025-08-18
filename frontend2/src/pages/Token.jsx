import { useState } from "react";
import axios from "axios";
import Ticker from "../components/Ticker"; 
import solLogo from "../assets/solana.png";   
import btcLogo from "../assets/bitcoin2.png";  
import ethLogo from "../assets/ethereum.png";
import bnbLogo from "../assets/bnb.png";
import { useNavigate } from "react-router-dom";

export function Token() {
  const [selectedCoin, setSelectedCoin] = useState({
    name: "Solana",
    symbol: "SOL",
    logo: solLogo
  });
  const [trend, setTrend] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [bool, setBool] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const coins = [
    { name: "Solana", symbol: "SOL", logo: solLogo },
    { name: "Bitcoin", symbol: "BTC", logo: btcLogo },
    { name: "Ethereum", symbol: "ETH", logo: ethLogo },
    { name: "BNB", symbol: "BNB", logo: bnbLogo },
  ];

  function callAPI(){
    axios.get(`http://localhost:3000/${selectedCoin.symbol}`)
      .then(function(response){
        setTrend(response.data.trend);
        setSuggestion(response.data.suggestion);
        setBool(true);
      })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-800 via-black to-gray-800">
      {bool ? navigate("/analyze", {state: {
        trend: trend,
        suggestion: suggestion
      }}): null}

      <div className="w-full max-w-2xl bg-neutral-300 rounded-2xl shadow-xl p-8">
        <h1 className="text-5xl font-bold mb-8 text-black flex justify-center items-center gap-2">
          BullRadar
        </h1>

        <div className="relative w-fit mx-auto">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 shadow border cursor-pointer hover:bg-gray-100"
          >
            <img src={selectedCoin.logo} alt={selectedCoin.name} className="w-6 h-6" />
            <span className="font-semibold text-gray-700">{selectedCoin.symbol}</span>
            <span className="ml-2 text-gray-500">▼</span>
          </div>

          {showDropdown && (
            <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border z-50">
              {coins.map((coin) => (
                <div
                  key={coin.symbol}
                  onClick={() => {
                    setSelectedCoin(coin);
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img src={coin.logo} alt={coin.name} className="w-5 h-5" />
                  <span className="text-gray-800">{coin.symbol}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="flex justify-center mt-6">
          <button
            onClick={callAPI}
            className="px-6 py-3 bg-gray-600 cursor-pointer text-white rounded-lg shadow hover:bg-gray-800 transition"
          >
            Analyze!
          </button>
        </div>
      </div>

      <Ticker />
    </div>
  );
}
