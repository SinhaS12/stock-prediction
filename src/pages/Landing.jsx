import "../components/FeatureCard"
import {motion} from "framer-motion";
import {Shield,Coins,ArrowLeftRight,Wallet,BarChart3, Feather, Route} from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";

export function Landing(){
    const navigate = useNavigate();
    const features=[
    {
      icon:<BarChart3 className="w-6 h-6"/>,
      title:"Marked Data",
      items:[
         "Show me trending tokens on CoinGecko",
        "What's the price of SOL right now?",
        "Get me a price chart for [token symbol]",
      ],
    },
    {
      icon:<ArrowLeftRight className="w-6 h-6"/>,
      title:"Trading & Swaps",
      items:[
         "Find the best rate to swap [token A] for [token B]",
        "Swap 1 SOL for [token symbol]",
        "Get detailed information about [token address]",
      ],
    },
    {
      icon:<Shield className="w-6 h-6"/>,
      title:"Token Analytics",
      items:[
         "Run a rugcheck on [token address]",
        "Show me the top holders of [token]",
        "Analyze this PumpFun token [token address]",
      ],
    },
    {
      icon:<ArrowLeftRight className="w-6 h-6"/>,
      title:"Cross-Chain Bridge (deBridge)",
      items:[
         "Bridge 100 USDC from Solana to Ethereum using deBridge",
        "Show me supported bridge destinations",
        "Check the status of my deBridge transaction [tx hash]",
      ],
    },
  ];

  function TokenPage(){

    navigate("/token");
  }

    return(
            <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-white p-8">
      <header className="text-center mb-14">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">Your Solana Ai Assistant</h1>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Explore market data,trading,wallet management,and more
        </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
        {features.map((feature,idx)=>(
          <FeatureCard key={idx} {...feature}/> 
        ))}
              <div className="mt-16 flex flex-col items-center">
            <button onClick={TokenPage}
            className="relative px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from red-500 to-blue-500 shadow-lg hover:shadow-blue-500/50 transition-all duration-300 ">
              login to Start Chatting
            </button>
            <p className="text-gray-500 text-sm mt-3">
              You will need to login to interact with the agent.
            </p>
          </div>
        {
          features.map(({icon, title, items}, i) => (
            <motion.div className="group by-gray-900/70 border border-gray-800 rounded-2xl p-8 backdrop-blur-lg transition-all duration-300"
          whileHover={{scale:1.05,y:-5}}
          whileTap={{scale:0.98}}
          >
          <div className="flex items-center gap-3 mb-6">
           <span className="text-red-500 text-2xl">{icon}</span> 
           <span className="text-xl font-semibold">{title}</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              {items.map((item,idx)=>{
                <li
                key={idx}className="flex items-start gap-2 hover:text-white transition-colors duration-200">
                  <span className="text-red-500 mt-1">.</span>
                  <span>{item}</span>
                </li>
              })}
            </ul>
          
          </motion.div>
          ))
        }
   
    </div>
    )
}