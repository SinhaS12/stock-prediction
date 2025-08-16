import { useState } from "react";
import axios from "axios";
import Ticker from "../components/Ticker"; 

export function Token() {
  const [selectedTab, setSelectedTab] = useState("wallet");
  const [searchType, setSearchType] = useState("standard");
  const [token, setToken] = useState("");
  const [trend, setTrend] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [bool, setBool] = useState(false);

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    alert("Copied!");
  };

  function callAPI(){
    console.log(token);
    axios.get(`http://localhost:3000/${token}`)
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

      <div className="w-full max-w-3xl mb-8">
      </div>

    
      <div className="w-full max-w-2xl bg-neutral-300 rounded-2xl shadow-xl p-8">
        <h1 className="text-5xl font-bold mb-8 text-black flex justify-center items-center gap-2">
          BullRadar <span></span>
        </h1>

        
        <div className="flex gap-3 items-center w-full">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 shadow border">
            <img
              src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png"
              alt="Solana"
              className="w-5 h-5"
              onError={(e) =>
                (e.target.src =
                  "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png")
              }
            />
            <span className="font-semibold text-gray-700">SOL</span>
          </div>

          <input onChange={(e)=>{
            const value = e.target.value;
            setToken(value);
          }}
            type="text"
            placeholder="Enter Wallet Address"
            className="flex-1 px-4 py-2 rounded-lg bg-purple-50 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={callAPI}
            className="px-5 py-2 bg-gray-400 cursor-pointer text-white rounded-lg shadow hover:bg-gray-700 transition"
          >
            Analyze!
          </button>
        </div>
      </div>
              <Ticker />

    </div>
  );
}
