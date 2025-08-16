import { ArrowUpRight } from "lucide-react";
import bgImage from "../assets/token-analysis-agent.webp"; 
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();

    function goToTokenPage(){
        navigate("/token");
    }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 text-center bg-black"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <div className="absolute inset-0 bg-black/20"></div>

      
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <span className="text-[20rem] font-bold text-gray-800 select-none">
          ⚡
        </span>
      </div>

   
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Your Solana Agent
        </h1>
        <h2 className="mt-2 text-4xl md:text-5xl font-semibold text-gray-200">
          Chat Smarter, Execute Faster
        </h2>
        <p className="mt-6 text-gray-400 text-lg">
          AI employee for Solana that's organized into specialized agents, each
          built to handle a distinct set of crypto operations.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={goToTokenPage}
          className="px-8 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition">
            Start Chatting
          </button>
        </div>
      </div>
    </div>
  );
}
