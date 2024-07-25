import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

function PostPreview({
  codeSnippet,
  jsCodeSnippet,
}: {
  codeSnippet: string;
  jsCodeSnippet: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState("100px");

  useEffect(() => {
    const handleResize = (event: MessageEvent) => {
      if (event.data.type === "setHeight") {
        setHeight(event.data.height + "px");
      }
    };

    window.addEventListener("message", handleResize);
    return () => {
      window.removeEventListener("message", handleResize);
    };
  }, []);

  DOMPurify.addHook("uponSanitizeElement", (node, data) => {
    if (data.tagName === "img" || data.tagName === "div") {
      const src = node.getAttribute("src");
      const style = node.getAttribute("style");
      if (src && src.startsWith("http")) {
        node.setAttribute("src", src);
      }
      if (style && style.includes("url(")) {
        node.setAttribute("style", style);
      }
    }
  });

  const sanitizedSnippet = DOMPurify.sanitize(codeSnippet || "", {
    ADD_ATTR: ["style", "background"],
  });

  return (
    <div className="p-4 text-[#000435] bg-white dark:text-white dark:bg-[#fff] z-0 overflow-hidden rounded border-2 border-sky-400">
      <iframe
        ref={ref}
        className="w-full border-0"
        srcDoc={getPreviewTemplate(sanitizedSnippet, jsCodeSnippet)}
        title="Preview"
        sandbox="allow-scripts allow-modals"
        style={{ minHeight: height, maxWidth: "100%" }}
      />
    </div>
  );
}

function getPreviewTemplate(sanitizedSnippet: string, jsCodeSnippet: string) {
  return `
      <!DOCTYPE html>
      <html class='flex w-full h-full'>
        <head>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <script>
            document.addEventListener('DOMContentLoaded', function() {
              const setHeight = () => {
                const height = document.body.scrollHeight;
                window.parent.postMessage({ type: 'setHeight', height }, '*');
              };
  
              setHeight();
  
              const observer = new MutationObserver(setHeight);
              observer.observe(document.body, { childList: true, subtree: true });
  
              window.addEventListener('beforeunload', () => observer.disconnect());
            });
          </script>
        </head>
        <body class='w-full h-full flex items-center justify-center min-w-full min-h-full'>
          <div class='w-full h-full p-6'>${sanitizedSnippet}</div>
          ${jsCodeSnippet ? `<script defer>${jsCodeSnippet}</script>` : ""}
        </body>
      </html>
    `;
}

export default PostPreview;
