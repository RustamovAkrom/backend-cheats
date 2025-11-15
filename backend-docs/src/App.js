import { useState, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MarkdownPage from './components/MarkdownPage';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import './index.css';

function App() {
  const [lang, setLang] = useState('EN');
  const filePath = lang === 'EN' ? '/README.md' : '/README_RUS.md';

  return (
    <ThemeProvider>
      <AppContent lang={lang} setLang={setLang} filePath={filePath} />
    </ThemeProvider>
  );
}

function AppContent({ lang, setLang, filePath }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <Header lang={lang} setLang={setLang} />

      <div className="flex flex-1 pt-16">
        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 lg:p-12 xl:p-16 overflow-x-auto">
          <div className="w-full flex justify-center">
            <div className="prose prose-lg sm:prose-xl lg:prose-2xl xl:prose-3xl dark:prose-invert max-w-5xl 2xl:max-w-6xl break-words w-full">
              <MarkdownPage filePath={filePath} theme={theme} />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
