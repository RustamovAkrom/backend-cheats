import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import DocsPage from "./pages/DocsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import type { Lang } from "./types/basicTypes";

export default function App() {
  const [lang, setLang] = useState<Lang>("EN");

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Header lang={lang} setLang={setLang} />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<HomePage lang={lang} setLang={setLang} />} />
            <Route path="/docs" element={<DocsPage lang={lang} setLang={setLang} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
