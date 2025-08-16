
import { useLocation } from "react-router-dom";


export function Analyze({}){
    const {state} = useLocation();

   
    return(
       
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      
      
      <button 
        className="w-64 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-green-400 text-white font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300"
        onClick={() => alert("Send Money clicked!")}
      >
        Send Money
      </button>

      
      <button
        className="w-64 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300"
        onClick={() => alert("Receive Money clicked!")}
      >
        Receive Money
      </button>
    </div>
);

    
}