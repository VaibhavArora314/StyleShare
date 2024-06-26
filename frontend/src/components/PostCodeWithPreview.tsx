import { useState } from "react";
import PostCodeWindow from "./PostCodeWindow";
import PostPreview from "./PostPreview";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

type Props = {
  id: string;
  isOwner: boolean;
  codeSnippet: string;
  jsCodeSnippet: string;
  showCustomizeAiOption: boolean;
  showTogether: boolean;
  handleCustomizeAi: () => void;
};

const PostCodeWithPreview = ({
  id,
  isOwner,
  codeSnippet,
  jsCodeSnippet,
  showCustomizeAiOption = true,
  handleCustomizeAi,
  showTogether = false,
}: Props) => {
  const [activeTab, setActiveTab] = useState<"html" | "js">("html");
  const [isPreview, setIsPreview] = useState(false);
  const { t } = useTranslation();


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

  const handleTabSwitch = (tab: "html" | "js") => {
    setActiveTab(tab);
  };

  return (
    <div className="relative my-2">
      {showTogether ? (
        <>
          <PostCodeWindow
            codeSnippet={codeSnippet}
            jsCodeSnippet={jsCodeSnippet}
            activeTab={activeTab}
            handleTabSwitch={handleTabSwitch}
          />
          <PostPreview
            jsCodeSnippet={jsCodeSnippet}
            codeSnippet={codeSnippet}
          />
        </>
      ) : isPreview ? (
        <PostPreview
          jsCodeSnippet={jsCodeSnippet}
          codeSnippet={codeSnippet}
        />
      ) : (
        <PostCodeWindow
          codeSnippet={codeSnippet}
          jsCodeSnippet={jsCodeSnippet}
          activeTab={activeTab}
          handleTabSwitch={handleTabSwitch}
        />
      )}

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
        {showCustomizeAiOption && (
          <button
            onClick={handleCustomizeAi}
            className="px-2 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 text-sm"
          >
            {t("postdet.cus")}
          </button>
        )}
        {!showTogether && (
          <button
            onClick={() => {setIsPreview(val => !val)}}
            className="px-2 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 text-sm"
          >
            {isPreview ? t("postdet.show") : t("postdet.preview")}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCodeWithPreview;
