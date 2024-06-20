import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { IPost } from '../types';
import { tokenState, userState } from '../store/atoms/auth';
import { useRecoilValue } from 'recoil';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import PostPreview from '../components/PostPreview';

const CustomizeWithAi = () => {
  const user = useRecoilValue(userState);
  const { id } = useParams<{ id: string }>();
  const [customCode, setCustomCode] = useState('');
  const [query, setQuery] = useState('');
  const location = useLocation();
  const post: IPost = location.state.post;
  const token = useRecoilValue(tokenState);
  const [isOriginalPreview, setIsOriginalPreview] = useState(false);
  const [isCustomPreview, setIsCustomPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleCustomize = async () => {
    if (!user.verified) {
      toast.error('Please verify to access this feature 😟');
      return;
    }

    if (query === '') {
      toast.error('Please fill the input 😟');
      return;
    }
    toast.promise(
      (async () => {
        setLoading(true);
        try {
          const response = await axios.post("/api/v1/posts/customize", { id, query }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCustomCode(response.data.customCode);
          setLoading(false);
        } catch (error: any) {
          console.error('Failed to customize the code', error);
          if (error.response) {
            console.error('Error response:', error.response.data);
          }
          setLoading(false);
          throw error;
        }
      })(),
      {
        loading: 'Sending your request to server ⏳',
        success: 'Customized successfully 😄',
        error: 'Something went wrong 😔'
      }
    );
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code snippet copied to clipboard');
  };

  const toggleOriginalPreview = () => {
    setIsOriginalPreview(!isOriginalPreview);
  };

  const toggleCustomPreview = () => {
    setIsCustomPreview(!isCustomPreview);
  };

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

  const sanitizedSnippet = DOMPurify.sanitize(post?.codeSnippet || "", {
    ADD_ATTR: ["style", "background"],
  });

  const sanitizedCustomCode = DOMPurify.sanitize(customCode || "", {
    ADD_ATTR: ["style", "background"],
  });

  return (
    <div className="customize-page p-6 text-white max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">✨ {t("postdet.cus")} ✨</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">😀 {t("custom.og")}</h2>
        <div className="relative my-4">
          {isOriginalPreview ? (
            <PostPreview sanitizedSnippet={sanitizedSnippet} jsCodeSnippet=''/>
          ) : (
            <pre className="p-4 bg-gray-800 border border-gray-700 rounded overflow-auto max-h-96 line-numbers language-html">
              <code>{post.codeSnippet}</code>
            </pre>
          )}
          <div className="absolute top-2 right-2 flex space-x-2">
            {isOriginalPreview ? null : (
              <button
                onClick={() => handleCopy(post.codeSnippet)}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
              >
                {t("postdet.copy")} 
              </button>
            )}
            <button
              onClick={toggleOriginalPreview}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
            >
              {isOriginalPreview ? t("postdet.show") : t("postdet.preview")}
            </button>
          </div>
        </div>
      </div>
      <input
        className="w-full p-3 mb-5 rounded bg-blue-950 backdrop-blur-sm "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("custom.des")}
        required
      />
      {loading ? (
        <button
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded mb-4 cursor-not-allowed"
          onClick={handleCustomize}
        >
          Please wait...
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded mb-4"
          onClick={handleCustomize}
        >
          {t("newPost.submit")}
        </button>
      )}
      {customCode && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">🌟 Customized Code Snippet</h2>
          <div className="relative my-4">
            {isCustomPreview ? (
              <PostPreview sanitizedSnippet={sanitizedCustomCode} jsCodeSnippet='' />
            ) : (
              <pre className="p-4 bg-gray-800 border border-gray-700 rounded overflow-auto max-h-96 line-numbers language-html">
                <code>{customCode}</code>
              </pre>
            )}
            <div className="absolute top-2 right-2 flex space-x-2">
              {isCustomPreview ? null : (
                <button
                  onClick={() => handleCopy(customCode)}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                >
                  {t("postdet.copy")}
                </button>
              )}
              <button
                onClick={toggleCustomPreview}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
              >
                {isCustomPreview ? t("postdet.show") : t("postdet.preview")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizeWithAi;
