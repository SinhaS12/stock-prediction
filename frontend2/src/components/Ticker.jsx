import { motion } from "framer-motion";
import solanaLogo from "../assets/solana.png";
import ethLogo from "../assets/ethereum.png";
import btcLogo from "../assets/bitcoin.png";
import bnbLogo from "../assets/bnb.png";

export default function Ticker() {
  const cryptos = [solanaLogo, ethLogo, btcLogo, bnbLogo, solanaLogo, ethLogo];

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-8">
    
      <div className="overflow-hidden relative w-full h-20 bg-black rounded-xl flex items-center">
      
        <motion.div
          className="flex gap-18 absolute left-0"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          {cryptos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="crypto"
              className="h-12 w-12 object-contain"
            />
          ))}
        </motion.div>


        <motion.div
          className="flex gap-28 absolute left-full"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          {cryptos.map((logo, index) => (
            <img
              key={`dup-${index}`}
              src={logo}
              alt="crypto"
              className="h-12 w-12 object-contain"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
