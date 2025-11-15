// src/components/MarkdownPage.jsx
import React, { useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

/* -----------------------
   Utilities
   ----------------------- */
// stable slugify for anchors
const slugify = (text = '') =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

// extract plain text from React children (robust)
function extractTextFromNode(children) {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractTextFromNode).join('');
  if (typeof children === 'object') {
    if (children.props && children.props.children) return extractTextFromNode(children.props.children);
    if (children.children) return extractTextFromNode(children.children);
  }
  return String(children) || '';
}

/* -----------------------
   Memoized Markdown viewer
   Re-renders only when `content` changes.
   ----------------------- */
const MarkdownViewer = React.memo(function MarkdownViewer({ content }) {
  // md components (stable) - do not capture outer states that change frequently
  const mdComponents = useMemo(() => ({
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      if (!inline && match) {
        // decide style by reading document attribute (no context subscription)
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const style = theme === 'dark' ? atomDark : oneLight;

        return (
          <div className="markdown-pre" style={{ marginBottom: 12 }}>
            <SyntaxHighlighter
              style={style}
              language={match[1]}
              PreTag="div"
              wrapLongLines={true}
              showLineNumbers
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </div>
        );
      }
      return (
        <code className="rounded px-1 py-0.5 bg-gray-100 dark:bg-gray-800 text-sm" {...props}>
          {children}
        </code>
      );
    },

    img: ({ node, alt, ...props }) => (
      <img alt={alt || 'image'} className="markdown-img mx-auto my-4" {...props} loading="lazy" />
    ),

    a: ({ node, ...props }) => {
      const href = props.href || '';
      if (href.startsWith('#')) {
        const id = href.slice(1);
        const handle = (e) => {
          e.preventDefault();
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', `#${id}`);
        };
        return (
          <a href={href} onClick={handle} className="text-blue-600 dark:text-blue-300 hover:underline">
            {props.children}
          </a>
        );
      }
      return (
        <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 hover:underline">
          {props.children}
        </a>
      );
    },

    // headings with robust id assignment
    h1: ({ node, children, ...props }) => {
      const raw = extractTextFromNode(children);
      const id = props.id || slugify(raw);
      return (
        <h1 id={id} className="text-3xl sm:text-4xl mt-8 mb-4 font-bold text-gray-900 dark:text-gray-100" {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ node, children, ...props }) => {
      const raw = extractTextFromNode(children);
      const id = props.id || slugify(raw);
      return (
        <h2 id={id} className="text-2xl sm:text-3xl mt-6 mb-3 font-semibold text-gray-900 dark:text-gray-100" {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ node, children, ...props }) => {
      const raw = extractTextFromNode(children);
      const id = props.id || slugify(raw);
      return (
        <h3 id={id} className="text-xl sm:text-2xl mt-5 mb-2 font-medium text-gray-800 dark:text-gray-100" {...props}>
          {children}
        </h3>
      );
    },
    h4: ({ node, children, ...props }) => {
      const raw = extractTextFromNode(children);
      const id = props.id || slugify(raw);
      return (
        <h4 id={id} className="text-lg mt-4 mb-2 font-medium text-gray-800 dark:text-gray-100" {...props}>
          {children}
        </h4>
      );
    },
  }), []);

  return (
    <div className="prose dark:prose-invert max-w-full break-words mx-auto">
      <div className="max-w-3xl mx-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkSlug]}
          rehypePlugins={[rehypeRaw]}
          components={mdComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // only rerender when content string changed
  return prevProps.content === nextProps.content;
});

/* -----------------------
   Main exported component
   ----------------------- */
export default function MarkdownPage({ filePath }) {
  const [content, setContent] = useState('');
  const [headings, setHeadings] = useState([]);
  const [query, setQuery] = useState('');

  // load file and extract headings (robustly)
  useEffect(() => {
    let mounted = true;
    setContent(''); // clear to show loading state if desired
    fetch(filePath)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to fetch ${filePath}: ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (!mounted) return;
        setContent(text);

        // extract headings by scanning lines (fast)
        const lines = text.split(/\r?\n/);
        const h = [];
        for (const line of lines) {
          const m = line.trim().match(/^(#{1,6})\s+(.+)$/);
          if (m) {
            const level = m[1].length;
            const raw = m[2].trim();
            const id = slugify(raw);
            h.push({ level, text: raw, id });
          }
        }
        setHeadings(h);
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setContent('# Error\nCould not load document.');
      });
    return () => {
      mounted = false;
    };
  }, [filePath]);

  // suggestions (search only by headings) — memoized and fast
  const suggestions = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return headings.filter(h => h.text.toLowerCase().includes(q)).slice(0, 20);
  }, [query, headings]);

  return (
    <div className="w-full px-3 sm:px-6 md:px-8 lg:px-12">
      {/* Search area */}
      <div className="max-w-3xl mx-auto mt-6">
        <div className="flex gap-2 items-center">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search headings (type to jump to a section)..."
            className="flex-1 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#041423] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Search headings"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400">Headings: {headings.length}</div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-2 bg-white dark:bg-[#041423] border border-gray-100 dark:border-gray-800 rounded shadow-sm">
            <ul>
              {suggestions.map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(s.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      window.history.pushState(null, '', `#${s.id}`);
                      setQuery('');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{s.text}</span>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">h{s.level}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Markdown viewer */}
      <div className="max-w-5xl mx-auto mt-6">
        <MarkdownViewer content={content} />
      </div>
    </div>
  );
}
