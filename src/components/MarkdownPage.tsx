// MarkdownPage.tsx
import { useEffect, useState, useMemo, useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/esm/styles/prism/atom-dark";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import { ThemeContext } from "../context/ThemeContext";
import './MarkdownPage.css';

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface MarkdownPageProps {
  filePath: string;
}

const slugify = (text = "") =>
  String(text).toLowerCase().trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");

const extractTextFromNode = (children: any): string => {
  if (!children) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractTextFromNode).join("");
  if (typeof children === "object") {
    if (children.props?.children) return extractTextFromNode(children.props.children);
    if (children.children) return extractTextFromNode(children.children);
  }
  return String(children) || "";
};

const MarkdownViewer = ({ content }: { content: string }) => {
  const { theme } = useContext(ThemeContext);

  const mdComponents = useMemo(() => ({
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      if (!inline && match) {
        const style = theme === "light" ? oneLight : atomDark; // исправлено: light=oneLight, dark=atomDark
        return (
          <div className="markdown-pre mb-4 rounded overflow-auto dark:bg-gray-800 bg-gray-100 transition-colors duration-300">
            <SyntaxHighlighter
              style={style}
              language={match[1]}
              PreTag="div"
              wrapLongLines
              showLineNumbers
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          </div>
        );
      }
      return <code className="rounded px-1 py-0.5 bg-gray-200 dark:bg-gray-700 text-sm" {...props}>{children}</code>;
    },
    img: ({ alt, ...props }: any) => (
      <img
        alt={alt || "image"}
        className="markdown-img mx-auto my-4 rounded shadow-sm transition-shadow hover:shadow-md"
        {...props}
        loading="lazy"
      />
    ),
    a: ({ href, children, ...props }: any) => {
      if (href?.startsWith("#")) {
        const id = slugify(decodeURIComponent(href.slice(1)));
        const handle = (e: React.MouseEvent) => {
          e.preventDefault();
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", `#${id}`);
        };
        return <a href={href} onClick={handle} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>;
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline" {...props}>{children}</a>;
    },
    h1: ({ children, ...props }: any) => {
      const raw = extractTextFromNode(children);
      const id = props.id || slugify(raw);
      return <h1 id={id} className="text-4xl font-bold mt-10 mb-6 dark:text-gray-100 text-gray-900" {...props}>{children}</h1>;
    },
    h2: ({ children, ...props }: any) => {
      const raw = extractTextFromNode(children);
      const id = props.id || slugify(raw);
      return <h2 id={id} className="text-3xl font-semibold mt-8 mb-4 dark:text-gray-100 text-gray-900" {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }: any) => {
      const raw = extractTextFromNode(children);
      const id = props.id || slugify(raw);
      return <h3 id={id} className="text-2xl font-medium mt-6 mb-3 dark:text-gray-100 text-gray-800" {...props}>{children}</h3>;
    },
    h4: ({ children, ...props }: any) => {
      const raw = extractTextFromNode(children);
      const id = props.id || slugify(raw);
      return <h4 id={id} className="text-xl mt-4 mb-2 dark:text-gray-100 text-gray-800" {...props}>{children}</h4>;
    },
  }), [theme]);

  return (
    <div className="markdown-body max-w-full break-words transition-colors duration-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkSlug]}
        rehypePlugins={[rehypeRaw]}
        components={mdComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default function MarkdownPage({ filePath }: MarkdownPageProps) {
  const [content, setContent] = useState("");
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    setContent("");
    fetch(filePath)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch ${filePath}: ${res.status}`);
        return res.text();
      })
      .then(text => {
        if (!mounted) return;
        setContent(text);

        const h: Heading[] = [];
        text.split(/\r?\n/).forEach(line => {
          const m = line.trim().match(/^(#{1,6})\s+(.+)$/);
          if (m) {
            const level = m[1].length;
            const raw = m[2].trim();
            h.push({ level, text: raw, id: slugify(raw) });
          }
        });
        setHeadings(h);
      })
      .catch(err => {
        console.error(err);
        if (mounted) setContent("# Error\nCould not load document.");
      });

    return () => { mounted = false; };
  }, [filePath]);

  const suggestions = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return headings.filter(h => h.text.toLowerCase().includes(q)).slice(0, 20);
  }, [query, headings]);

  return (
    <div className="w-full px-4 py-6 md:px-10">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search headings..."
            className="flex-1 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
            aria-label="Search headings"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">{headings.length} headings</span>
        </div>

        {suggestions.length > 0 && (
          <div className="mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow">
            <ul>
              {suggestions.map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(s.id);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      window.history.pushState(null, "", `#${s.id}`);
                      setQuery("");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium dark:text-gray-100 text-gray-900">{s.text}</span>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">h{s.level}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Markdown Content */}
<div className="markdown-body mx-auto mt-6 px-4 sm:px-6 md:px-8">
  <MarkdownViewer content={content} />
</div>

    </div>
  );
}
