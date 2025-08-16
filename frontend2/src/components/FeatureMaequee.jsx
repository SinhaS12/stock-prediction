
import { motion } from "framer-motion";

export default function FeatureMarquee() {
    
  const features = [
    {
      title: "📊 Marked Data",
      items: [
        "Show me trending tokens on CoinGecko",
        "What's the price of SOL right now?",
        "Get me a price chart for [token symbol]",
      ],
    },
    {
      title: "🔄 Trading & Swaps",
      items: [
        "Find the best rate to swap [token A] for [token B]",
        "Swap 1 SOL for [token symbol]",
        "Get detailed information about [token address]",
      ],
    },
    {
      title: "🛡️ Token Analytics",
      items: [
        "Run a rugcheck on [token address]",
        "Show me the top holders of [token]",
        "Analyze this PumpFun token [token address]",
      ],
    },
    {
      title: "🌉 Cross-Chain Bridge (deBridge)",
      items: [
        "Bridge 100 USDC from Solana to Ethereum using deBridge",
        "Show me supported bridge destinations",
        "Show me top cross-chain transactions",
      ],
    },
  ];

  return (
    <div className="overflow-hidden bg-gray-950 py-8">
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 40, 
          ease: "linear",
        }}
      >
        
        {features.map((feature, i) => (
          <div
            key={i}
            className="min-w-[350px] bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg text-white"
          >
            <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
              {feature.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        
        {features.map((feature, i) => (
          <div
            key={`dup-${i}`}
            className="min-w-[350px] bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg text-white"
          >
            <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
              {feature.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
