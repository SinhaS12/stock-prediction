import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, items }) {
  return (
    <motion.div
      className="group bg-gray-900/70 border border-gray-800 rounded-2xl p-8 backdrop-blur-lg transition-all duration-300"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-red-500 text-2xl">{icon}</span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <ul className="space-y-3 text-sm text-gray-300">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 hover:text-white transition-colors duration-200"
          >
            <span className="text-red-500 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
