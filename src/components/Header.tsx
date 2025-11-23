// Header.tsx
import ThemeToggle from "./ThemeToggle";
import type { PageProps } from "../types/basicTypes";

export default function Header({ lang, setLang }: PageProps) {
  return (
    <header className="
      fixed top-0 left-0 right-0 z-50
      backdrop-blur-md
      bg-white/70 dark:bg-[#0b1220]/70
      border-b border-gray-200 dark:border-gray-800
      transition-colors duration-300
    ">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">

        {/* LEFT SIDE: Logo */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-xl sm:text-2xl font-extrabold tracking-tight
                       text-gray-900 dark:text-gray-100
                       hover:text-blue-600 dark:hover:text-blue-400
                       transition-colors"
          >
            Backend Cheats
          </a>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* Language switch for desktop */}
          <div className="hidden sm:flex items-center gap-2">
            {["EN", "RU"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l as "EN" | "RU")}
                className={`
                  px-3 py-1 rounded-lg text-sm font-medium transition-colors
                  ${lang === l
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"}
                `}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Language switch for mobile */}
          <div className="sm:hidden">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "EN" | "RU")}
              className="
                px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-400
                transition-colors"
            >
              <option value="EN">EN</option>
              <option value="RU">RU</option>
            </select>
          </div>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
