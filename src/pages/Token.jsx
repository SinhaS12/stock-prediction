import { useState } from "react";
import { Copy } from "lucide-react";

export function Token() {
  const [selectedTab, setSelectedTab] = useState("wallet");
  const [searchType, setSearchType] = useState("standard");

  const chains = [
    { label: "SOL", address: "EBwMpd2zHKJuG3qxqBgLgNYpjS9DJLtPpG2CytcJqhJL" },
    { label: "SOL", address: "0xa336033fc39a359e375007e75af49768e98d0790" },
    { label: "SOL", address: "bc1qs4ln7kdtcwvcualqlv0qmf7cm446tdzjwv89c" },
    { label: "SOL", address: "0xa336033fc39a359e375007e75af49768e98d0790" },
    { label: "SOL", address: "TLUd7JuJbZuqxknlitHGurXUknygmRuiSj" },
  ];

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    alert("Copied!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-red-100 via-white to-red-200">
      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-8 text-red-900">
          Start Investigation <span>🔍</span>
        </h1>

        {/* Fixed Solana chain + input + button */}
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

          <input
            type="text"
            placeholder="Enter Wallet Address"
            className="flex-1 px-4 py-2 rounded-lg bg-purple-50 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
            Validating!
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-2 border-dashed border-red-300 rounded-lg p-6 bg-red-50">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setSelectedTab("wallet")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedTab === "wallet"
                  ? "bg-red-500 text-white shadow"
                  : "bg-white border hover:bg-gray-50"
              }`}
            >
              Wallet
            </button>
          </div>

          {/* Radio buttons */}
          <div>
            <p className="mb-2 font-medium text-gray-700">Select search type :</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  checked={searchType === "standard"}
                  onChange={() => setSearchType("standard")}
                />
                <span>
                  Standard <span className="text-gray-500">(fastest)</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Chain addresses */}
        <div className="mt-8 space-y-3">
          {chains.map((chain, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <span className="font-mono text-sm text-gray-700">
                {chain.label}:{chain.address}
              </span>
              <button
                onClick={() => handleCopy(chain.address)}
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
              >
                <Copy size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
