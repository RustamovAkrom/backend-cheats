// Header.tsx
import ThemeToggle from "./ThemeToggle";
import type { PageProps } from "../types/basicTypes";
import { motion } from "framer-motion";

export default function Header({ lang, setLang }: PageProps) {
  return (
    <header className="
      fixed top-0 left-0 right-0 z-50
      backdrop-blur-lg
      bg-white/30 dark:bg-[#0b1220]/30
      border-b border-gray-200 dark:border-gray-800
      transition-all duration-500
    ">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">

        {/* LEFT SIDE: Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, textShadow: "0 0 10px rgba(59, 130, 246, 0.7)" }}
          transition={{ duration: 0.3 }}
          className="text-xl sm:text-2xl font-extrabold tracking-tight
                     text-gray-900 dark:text-gray-100
                     transition-colors"
        >
          Backend Cheats
        </motion.a>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* Language switch for desktop */}
          <div className="hidden sm:flex items-center gap-2">
            {["EN", "RU"].map((l) => (
              <motion.button
                key={l}
                onClick={() => setLang(l as "EN" | "RU")}
                whileHover={{ scale: 1.1, boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)" }}
                transition={{ duration: 0.2 }}
                className={`
                  px-3 py-1 rounded-lg text-sm font-medium transition-all
                  ${lang === l
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"}
                `}
              >
                {l}
              </motion.button>
            ))}
          </div>

          {/* Language switch for mobile */}
          <motion.div className="sm:hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "EN" | "RU")}
              className="
                px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-400
                transition-colors
              "
            >
              <option value="EN">EN</option>
              <option value="RU">RU</option>
            </select>
          </motion.div>

          {/* Theme toggle */}
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
