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
      <div className="mb-2 ">
        <div className="flex p-1 border-2 border-sky-500 rounded">
          <button
            onClick={() => handleTabSwitch("html")}
            className={`px-2 py-1  mx-1 font-semibold rounded-md ${
              activeTab === "html"
                ? "bg-sky-500 text-[#ffffff] dark:bg-sky-500 dark:text-white "
                : "border border-sky-500 text-sky-500 dark:text-white"
            }`}
          >
            HTML
          </button>
          {jsCodeSnippet != "" ? (
            <button
              onClick={() => handleTabSwitch("js")}
              className={`px-2 py-1  mx-1 font-semibold rounded-md ${
                activeTab === "js"
                  ? "bg-sky-500 text-[#ffffff] dark:bg-sky-500 dark:text-white"
                  : "border border-sky-500 text-sky-500 dark:text-white"
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
            <pre className="p-4 text-[#000435] bg-sky-300 dark:text-white dark:bg-[#223bb9] border-4 border-sky-700 rounded overflow-auto max-h-96">
              <code>{jsCodeSnippet}</code>
            </pre>
          )}
        </div>
      </div>
    </>
  );
}

export default PostCodeWindow;
