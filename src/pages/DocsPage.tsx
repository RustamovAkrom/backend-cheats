import { useEffect } from "react";
import { useLoader } from "../context/LoaderContext";
import type { PageProps } from "../types/basicTypes";
import MarkdownPage from "../components/MarkdownPage";

export default function DocsPage({ lang }: PageProps) {
  const { startLoading, stopLoading, setProgress } = useLoader();
  const filePath = lang === "EN" ? "/README.md" : "/README_RUS.md";

  useEffect(() => {
    startLoading();
    fetch(filePath)
      .then(res => res.text())
      .then(() => {
        // Можно тут обработать Markdown, если нужно
        setProgress(100);
      })
      .finally(() => stopLoading());
  }, [filePath, startLoading, stopLoading, setProgress]);

  return (
    <div className="px-4 py-6 md:px-10">
      <MarkdownPage filePath={filePath} />
    </div>
  );
}
