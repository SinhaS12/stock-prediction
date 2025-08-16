// components/Marquee.jsx
import { motion } from "framer-motion";

export default function Marquee() {
  const items = [
    { type: "text", content: "🚀 Solana Hackathon" },
    { type: "image", content: "https://images.unsplash.com/photo-1754942668740-8a815525cf2b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { type: "text", content: "💰 Build on Web3 Projects" },
    { type: "image", content: "" },
    { type: "text", content: "⚡ Lightning Fast Transaction" },
    { type: "image", content: "" },
    { type: "text", content: "🔥 Framer Motion" },
    { type: "image", content: "" },
  ];

  return (
    <div className="overflow-hidden bg-black py-4">
      <motion.div
        className="flex items-center"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 40, // speed (smaller = faster)
          ease: "linear",
        }}
      >
        {/* Original Set */}
        {items.map((item, i) =>
          item.type === "text" ? (
            <span
              key={i}
              className="text-white text-xl font-semibold mx-8 inline-block"
            >
              {item.content}
            </span>
          ) : (
            <img
              key={i}
              src={item.content}
              alt={`marquee-img-${i}`}
              className="h-48 w-48 object-cover mx-6 rounded-lg shadow-md"
            />
          )
        )}

        {/* Duplicate Set for seamless loop */}
        {items.map((item, i) =>
          item.type === "text" ? (
            <span
              key={`dup-${i}`}
              className="text-white text-xl font-semibold mx-8 flex items-center"
            >
              {item.content}
            </span>
          ) : (
            <img
              key={`dup-${i}`}
              src={item.content}
              alt={`marquee-img-dup-${i}`}
              className="h-36 w-36 object-cover mx-6 rounded-xl shadow-lg"
            />
          )
        )}
      </motion.div>
    </div>
  );
}
