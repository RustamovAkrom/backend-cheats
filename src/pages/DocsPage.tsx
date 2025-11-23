// DocsPage.tsx
import { useEffect } from "react";
import { useLoader } from "../context/LoaderContext";
import type { PageProps } from "../types/basicTypes";
import MarkdownPage from "../components/MarkdownPage";


export default function DocsPage({ lang }: PageProps) {
  const filePath = lang === "EN" ? "/README.md" : "/README_RUS.md";
  const { startLoading, stopLoading, setProgress } = useLoader();

  useEffect(() => {
    startLoading();
    fetch(lang === "EN" ? "/README.md" : "/README_RUS.md")
      .then(res => res.text())
      .then(text => {
        setProgress(100);
        stopLoading();
      });
  }, [lang]);

  return (
    <div className="px-4 py-6 md:px-10">
      <MarkdownPage filePath={filePath} />
    </div>
  );
}
