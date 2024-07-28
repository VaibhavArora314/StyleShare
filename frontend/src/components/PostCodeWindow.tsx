import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/agate.css"; 

function PostCodeWindow({
  codeSnippet,
  jsCodeSnippet,
  activeTab,
  handleTabSwitch
}: {
  codeSnippet: string;
  jsCodeSnippet: string;
  activeTab: string;
  handleTabSwitch: (tab: "html" | "js") => void;
}) {
  useEffect(() => {
    hljs.highlightAll();
  }, [codeSnippet, jsCodeSnippet, activeTab]);

  useEffect(() => {
    const highlightedCode = document.querySelectorAll("pre code");
    highlightedCode.forEach((block) => {
      block.removeAttribute("data-highlighted");
      hljs.highlightElement(block as HTMLElement);
    });
  }, [activeTab]);

  return (
    <>
      <div className="mb-2">
        <div className="flex p-1 border-2 border-sky-500 rounded">
          <button
            onClick={() => handleTabSwitch("html")}
            className={`px-2 py-1 mx-1 font-semibold rounded-md ${
              activeTab === "html"
                ? "bg-sky-500 text-[#ffffff] dark:bg-sky-500 dark:text-white"
                : "border border-sky-500 text-sky-500 dark:text-white"
            }`}
          >
            HTML
          </button>
          {jsCodeSnippet !== "" && (
            <button
              onClick={() => handleTabSwitch("js")}
              className={`px-2 py-1 mx-1 font-semibold rounded-md ${
                activeTab === "js"
                  ? "bg-sky-500 text-[#ffffff] dark:bg-sky-500 dark:text-white"
                  : "border border-sky-500 text-sky-500 dark:text-white"
              }`}
            >
              JS
            </button>
          )}
        </div>
        <div className="">
        {activeTab === "html" ? (
          <pre className="p-4 text-[#000435] bg-sky-300 dark:text-white dark:bg-gray-800 border-4 border-sky-700 rounded overflow-auto max-h-96">
            <code className="html rounded-lg">{codeSnippet}</code>
          </pre>
        ) : (
          <pre className="p-4 text-[#000435] bg-sky-300 dark:text-white dark:bg-gray-800 border-4 border-sky-700 rounded overflow-auto max-h-96">
            <code className="javascript rounded-lg">{jsCodeSnippet}</code>
          </pre>
        )}
      </div>
      </div>
    </>
  );
}

export default PostCodeWindow;
