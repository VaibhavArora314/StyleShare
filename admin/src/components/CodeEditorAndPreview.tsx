import { useState } from 'react';
import PostPreview from "../components/PostPreview";
import Switch from "react-switch";
import toast from "react-hot-toast";

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
        <label htmlFor="codeSnippet" className="block text-gray-700 text-sm font-semibold">
          HTML
        </label>
        <textarea
          id="codeSnippet"
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
          className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          readOnly={isPreviewMode}
          onClick={handleTextAreaClick}
          rows={5}
        ></textarea>
      </div>
      <div>
        <label htmlFor="jsCodeSnippet" className="block text-gray-700 text-sm font-semibold">
          Javascript
        </label>
        <textarea
          id="jsCodeSnippet"
          value={jsCodeSnippet}
          onChange={(e) => setJsCodeSnippet(e.target.value)}
          className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          readOnly={isPreviewMode}
          onClick={handleTextAreaClick}
          rows={4}
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
          <span className="text-gray-700 text-sm font-semibold">
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