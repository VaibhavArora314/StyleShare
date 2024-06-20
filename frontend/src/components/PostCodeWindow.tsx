import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function PostCodeWindow({
  id,
  isOwner,
  codeSnippet,
  jsCodeSnippet,
  showCustomizeAiOption = true,
  handleCustomizeAi,
}: {
  id: string;
  isOwner: boolean;
  codeSnippet: string;
  jsCodeSnippet: string;
  showCustomizeAiOption: boolean;
  handleCustomizeAi: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"html" | "js">("html");
  const { t } = useTranslation();

  const handleTabSwitch = (tab: "html" | "js") => {
    setActiveTab(tab);
  };

  const handleCopy = () => {
    if (codeSnippet && activeTab === "html") {
      navigator.clipboard.writeText(codeSnippet);
      toast.success("HTML Code copied to clipboard");
    }
    if (jsCodeSnippet && activeTab === "js") {
      navigator.clipboard.writeText(jsCodeSnippet);
      toast.success("JavaScript copied to clipboard");
    }
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <div className="flex bg-gray-800 border border-gray-700 rounded">
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
            <pre className="p-4 bg-gray-800 border border-gray-700 rounded overflow-auto max-h-96">
              <code>{codeSnippet}</code>
            </pre>
          ) : (
            <pre className="p-4 bg-gray-800 border border-gray-700 rounded overflow-auto max-h-96">
              <code>{jsCodeSnippet}</code>
            </pre>
          )}
        </div>
      </div>
      <div className="absolute top-2 right-3 flex space-x-2">
        {isOwner ? (
          <Link
            to={`/app/posts/edit/${id}`}
            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
          >
            Edit
          </Link>
        ) : null}
        <button
          onClick={handleCopy}
          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
        >
          {t("postdet.copy")}
        </button>
        {showCustomizeAiOption && <button
          onClick={handleCustomizeAi}
          className="px-2 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 text-sm"
        >
          {t("postdet.cus")}
        </button>}
      </div>
    </div>
  );
}

export default PostCodeWindow;
