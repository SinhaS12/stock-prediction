import { motion } from "framer-motion";
import Hero from "../components/Hero";
import {
  Shield,
  ArrowLeftRight,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Landing() {
   
  const navigate = useNavigate();

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Market Data",
      items: [
        "Show me trending tokens on CoinGecko",
        "What's the price of SOL right now?",
        "Get me a price chart for [token symbol]",
      ],
    },
    {
      icon: <ArrowLeftRight className="w-6 h-6" />,
      title: "Trading & Swaps",
      items: [
        "Find the best rate to swap [token A] for [token B]",
        "Swap 1 SOL for [token symbol]",
        "Get detailed information about [token address]",
      ],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Token Analytics",
      items: [
        "Run a rugcheck on [token address]",
        "Show me the top holders of [token]",
        "Analyze this PumpFun token [token address]",
      ],
    },
    {
      icon: <ArrowLeftRight className="w-6 h-6" />,
      title: "Cross-Chain Bridge (deBridge)",
      items: [
        "Bridge 100 USDC from Solana to Ethereum using deBridge",
        "Show me supported bridge destinations",
        "Check the status of my deBridge transaction [tx hash]",
      ],
    },
  ];

  function goToTokenPage() {
    navigate("/token");
  }

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-white p-8">
       <div className="bg-black min-h-screen text-white">
      <Hero />
      <div className="max-w-screen-lg mx-auto px-6 py-16">
       
      </div>
    </div>
      <header className="text-center mb-14">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
          Your Trading  Assistant
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
          Explore market data, trading, wallet management, and more.
        </p>
      </header>

       <div className="overflow-hidden relative max-w-6xl mx-auto">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {[...features, ...features].map(({ icon, title, items }, i) => (
            <div
              key={i}
              className="w-80 shrink-0 bg-gray-900/70 border border-gray-800 rounded-2xl p-6 backdrop-blur-lg hover:border-gray-700 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-red-500 text-2xl">{icon}</span>
                <span className="text-lg font-semibold">{title}</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 hover:text-white transition-colors"
                  >
                    <span className="text-red-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>

      
      <div className="mt-20 flex flex-col items-center">
        <button
          onClick={goToTokenPage}
          className="px-10 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-red-800 to-red-500 shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          Start Chatting
        </button>
        <p className="text-gray-500 text-sm mt-3">
          You will need to login to interact with the agent.
        </p>
      </div>
    </div>
  );
}
