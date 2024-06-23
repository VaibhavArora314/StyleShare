function PostCodeWindow({
  codeSnippet,
  jsCodeSnippet,
  activeTab,
  handleTabSwitch
}: {
  codeSnippet: string;
  jsCodeSnippet: string;
  activeTab: string;
  handleTabSwitch: (tab: "html" | "js") => void
}) {
  return (
    <>
      <div className="mb-2">
        <div className="flex text-[#000435] bg-white dark:text-white dark:bg-[#000435] border border-sky-700 rounded">
          <button
            onClick={() => handleTabSwitch("html")}
            className={`px-4 py-2 ${
              activeTab === "html"
                ? "bg-blue-600 text-white"
                : "border border-gray-700 text-white"
            }`}
          >
            HTML
          </button>
          {jsCodeSnippet != "" ? (
            <button
              onClick={() => handleTabSwitch("js")}
              className={`px-4 py-2 ${
                activeTab === "js"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-700  text-white"
              }`}
            >
              JavaScript
            </button>
          ) : null}
        </div>
        <div className="">
          {activeTab === "html" ? (
            <pre className="p-4 text-[#000435] bg-sky-300 dark:text-white dark:bg-[#223bb9] border-4 border-sky-700 rounded overflow-auto max-h-96">
              <code>{codeSnippet}</code>
            </pre>
          ) : (
            <pre className="p-4 bg-gray-800 border border-gray-700 rounded overflow-auto max-h-96">
              <code>{jsCodeSnippet}</code>
            </pre>
          )}
        </div>
      </div>
    </>
  );
}

export default PostCodeWindow;
