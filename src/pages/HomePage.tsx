// HomePage.tsx
import type { PageProps } from "../types/basicTypes";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage({ lang }: PageProps) {
  return (
    <div className="relative flex flex-col justify-center items-center text-center min-h-screen px-6 md:px-12 lg:px-24 space-y-10 py-12 overflow-hidden bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-gray-900 dark:to-slate-900 transition-colors duration-500">

      {/* Animated floating shapes in background */}
      <motion.div
        className="absolute w-72 h-72 bg-blue-300 rounded-full opacity-30 blur-3xl top-[-5rem] left-[-5rem]"
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute w-60 h-60 bg-purple-400 rounded-full opacity-20 blur-2xl bottom-[-5rem] right-[-5rem]"
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 z-10"
      >
        Backend Cheats
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg sm:text-xl max-w-2xl leading-relaxed text-gray-700 dark:text-gray-300 z-10"
      >
        {lang === "EN"
          ? "Your ultimate reference for backend development. Explore guides, tutorials, and Markdown documentation."
          : "Ваше лучшее руководство по backend разработке. Изучайте гайды, туториалы и документацию в Markdown."}
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 mt-4 z-10"
      >
        <Link
          to="/docs"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-500 transition-transform duration-300"
        >
          {lang === "EN" ? "Go to Documentation" : "Перейти к документации"}
        </Link>

        <a
          href="https://github.com/RustamovAkrom/backend-cheats"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold shadow hover:scale-105 dark:text-blue-400 dark:hover:bg-blue-900 hover:bg-blue-50 transition-all duration-300"
        >
          {lang === "EN" ? "GitHub Repository" : "Репозиторий на GitHub"}
        </a>
      </motion.div>
    </div>
  );
}
