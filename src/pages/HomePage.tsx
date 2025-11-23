// HomePage.tsx
import { useEffect } from "react";
import { useLoader } from "../context/LoaderContext";
import type { PageProps } from "../types/basicTypes";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTelegramPlane } from "react-icons/fa";

export default function HomePage({ lang }: PageProps) {
  const { startLoading, stopLoading, setProgress } = useLoader();

  useEffect(() => {
    startLoading();
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 15;
      if (value >= 100) {
        setProgress(100);
        stopLoading();
        clearInterval(interval);
      } else setProgress(value);
    }, 200);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative flex flex-col justify-center items-center text-center min-h-screen px-6 md:px-12 lg:px-24 py-12 space-y-10 overflow-hidden
                    bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-gray-900 dark:to-slate-900 transition-colors duration-500">

      {/* Background animated shapes */}
      <motion.div
        className="absolute w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl top-[-5rem] left-[-5rem]"
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute w-60 h-60 bg-purple-400 rounded-full opacity-15 blur-2xl bottom-[-5rem] right-[-5rem]"
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 z-10"
      >
        Backend Cheats
      </motion.h1>

      {/* Logo */}
<motion.a
  href="https://github.com/RustamovAkrom/backend-cheats/blob/master/README.md"
  initial={{ scale: 0.95, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.5 }}
  className="z-10 w-full max-w-3xl md:max-w-5xl mx-auto"
>
  <img
    src="./files/logo.png"
    alt="Logo"
    className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
  />
</motion.a>


      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-base sm:text-lg md:text-xl max-w-md sm:max-w-xl md:max-w-2xl leading-relaxed text-gray-700 dark:text-gray-300 z-10"
      >
        {lang === "EN"
          ? "Your ultimate reference for backend development. Explore guides, tutorials, and Markdown documentation."
          : "Ваше лучшее руководство по backend разработке. Изучайте гайды, туториалы и документацию в Markdown."}
      </motion.p>

      {/* Main buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 mt-4 z-10"
      >
        <Link
          to="/docs"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg
                     hover:scale-105 hover:from-blue-600 hover:to-blue-500 transition-transform duration-300"
        >
          {lang === "EN" ? "Go to Documentation" : "Перейти к документации"}
        </Link>

        <a
          href="https://github.com/RustamovAkrom/backend-cheats"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold shadow
                     hover:scale-105 dark:text-blue-400 dark:hover:bg-blue-900 hover:bg-blue-50 transition-all duration-300"
        >
          {lang === "EN" ? "GitHub Repository" : "Репозиторий на GitHub"}
        </a>
      </motion.div>

      {/* Social Media Buttons */}
      <motion.div
        className="flex gap-6 mt-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <motion.a
          href="https://github.com/RustamovAkrom"
          target="_blank"
          whileHover={{ scale: 1.25, rotate: 10 }}
          className="text-gray-800 dark:text-gray-100 text-2xl transition-all duration-300"
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/akrom-rustamov-255b372b7/"
          target="_blank"
          whileHover={{ scale: 1.25, rotate: 10 }}
          className="text-blue-600 dark:text-blue-400 text-2xl transition-all duration-300"
        >
          <FaLinkedin />
        </motion.a>
        <motion.a
          href="https://t.me/Akrom_Rustamov"
          target="_blank"
          whileHover={{ scale: 1.25, rotate: 10 }}
          className="text-blue-400 dark:text-blue-300 text-2xl transition-all duration-300"
        >
          <FaTelegramPlane />
        </motion.a>
      </motion.div>
    </div>
  );
}
