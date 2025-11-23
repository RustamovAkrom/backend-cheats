import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface LoaderContextType {
  startLoading: () => void;
  stopLoading: () => void;
  setProgress: (value: number) => void;
}

const LoaderContext = createContext<LoaderContextType>({
  startLoading: () => {},
  stopLoading: () => {},
  setProgress: () => {},
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgressValue] = useState(0);

  const startLoading = () => {
    setLoading(true);
    setProgressValue(0);
  };

  const stopLoading = () => {
    setProgressValue(100);
    setTimeout(() => setLoading(false), 300);
  };

  const setProgress = (value: number) => setProgressValue(value);

  return (
    <LoaderContext.Provider value={{ startLoading, stopLoading, setProgress }}>
      {children}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/50">
          <motion.div
            className="w-24 h-24 border-4 border-t-blue-500 border-b-purple-500 rounded-full animate-spin"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
          />
          <p className="absolute text-white dark:text-white font-bold">{Math.round(progress)}%</p>
        </div>
      )}
    </LoaderContext.Provider>
  );
};
