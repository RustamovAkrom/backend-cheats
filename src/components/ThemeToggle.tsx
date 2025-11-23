// src/components/ThemeToggle.tsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle theme"
      className="
        relative flex items-center justify-center
        w-11 h-11 rounded-xl border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900
        shadow-sm dark:shadow-md
        hover:shadow-md dark:hover:shadow-lg
        transition-all duration-300
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            <Sun className="w-6 h-6 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            <Moon className="w-6 h-6 text-indigo-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
