// DocsPage.tsx
import type { PageProps } from "../types/basicTypes";
import MarkdownPage from "../components/MarkdownPage";

export default function DocsPage({ lang }: PageProps) {
  const filePath = lang === "EN" ? "/README.md" : "/README_RUS.md";
  return (
    <div className="px-4 py-6 md:px-10">
      <MarkdownPage filePath={filePath} />
    </div>
  );
}
