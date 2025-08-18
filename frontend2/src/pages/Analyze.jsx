import { useLocation } from "react-router-dom";

export function Analyze() {
  const { state } = useLocation();

  const score = state?.score || 50; 

  
  let progressColor = "bg-red-500"; 
  if (score >= 30 && score < 60) {
    progressColor = "bg-blue-500";
  } else if (score >= 60 && score <= 100) {
    progressColor = "bg-green-500";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      
      <h2 className="text-2xl font-extrabold text-white mb-2">Market Trend</h2>
      {state.trend === "Bearish" ? (
        <button
          className="w-64 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          {state.trend}
        </button>
      ) : (
        <button
          className="w-64 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          {state.trend}
        </button>
      )}

      <h2 className="text-2xl font-extrabold text-white mt-6 mb-2">Suggestion</h2>
      <button
        className="w-64 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300"
      >
        {state.suggestion}
      </button>

      
      <div className="w-full max-w-xl mt-8">
        <h2 className="text-xl font-bold text-white mb-2">Confidence Score</h2>
        <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden shadow-lg">
          <div
            className={`h-5 rounded-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <p className="text-white mt-2 text-center font-semibold">{score}%</p>
      </div>
    </div>
  );
}
