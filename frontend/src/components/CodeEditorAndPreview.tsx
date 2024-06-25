import { useState } from 'react';
import PostPreview from "../components/PostPreview";
import Switch from "react-switch";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

type Props = {
  codeSnippet: string;
  jsCodeSnippet: string;
  setCodeSnippet: (codeSnippet: string) => void;
  setJsCodeSnippet: (jsCodeSnippet: string) => void;
};

function CodeEditorAndPreview({
  codeSnippet,
  jsCodeSnippet,
  setCodeSnippet,
  setJsCodeSnippet
}: Props) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { t } = useTranslation();

  const handleToggle = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleTextAreaClick = () => {
    if (isPreviewMode) {
      toast('Please disable preview mode to edit the code snippet', {
        icon: '🚫',
      });
    }
  };


  return (
    <div>
      <div>
        <label htmlFor="codeSnippet" className="block text-sm font-medium">
          {t("newPost.codeSnippet")}
        </label>
        <textarea
          id="codeSnippet"
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
          className="mt-1 p-2 w-full text-[#000435] bg-white dark:text-white dark:bg-[#000435] border border-sky-500 rounded"
          readOnly={isPreviewMode}
          onClick={handleTextAreaClick}
        ></textarea>
      </div>
      <div>
        <label htmlFor="jsCodeSnippet" className="block text-sm font-medium">
          {t("newPost.jsCodeSnippet")}
        </label>
        <textarea
          id="jsCodeSnippet"
          value={jsCodeSnippet}
          onChange={(e) => setJsCodeSnippet(e.target.value)}
          className="mt-1 p-2 w-full text-[#000435] bg-white dark:text-white dark:bg-[#000435] border border-sky-500 rounded"
          readOnly={isPreviewMode}
          onClick={handleTextAreaClick}
        ></textarea>
      </div>
      <div className="flex items-center mt-2 mb-2">
        <label className="flex items-center">
          <Switch
            onChange={handleToggle}
            checked={isPreviewMode}
            offColor="#888"
            onColor="#080"
            uncheckedIcon={false}
            checkedIcon={false}
            disabled={codeSnippet == ""}
            height={16}
            width={32}
            className="mr-2"
          />
          <span className="text-sm font-medium">
            {isPreviewMode ? 'Edit Code' : 'Preview Component'}
          </span>
        </label>
      </div>
      {isPreviewMode ? (
        <PostPreview
          jsCodeSnippet={jsCodeSnippet}
          codeSnippet={codeSnippet}
        />
      ) : null}

    </div>
  );

}

export default CodeEditorAndPreview;