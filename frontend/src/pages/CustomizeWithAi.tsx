import { useState, useRef, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { IPost } from '../types';
import { tokenState, userState } from '../store/atoms/auth';
import { useRecoilValue } from 'recoil';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';

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
  const refOriginal = useRef<HTMLIFrameElement>(null);
  const refCustom = useRef<HTMLIFrameElement>(null);
  const [originalHeight, setOriginalHeight] = useState('0px');
  const [customHeight, setCustomHeight] = useState('0px');
  const [loading, setLoading] = useState(false);

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

  const onLoadOriginal = () => {
    setOriginalHeight(refOriginal.current?.contentWindow?.document.body.scrollHeight + 'px');
  };

  const onLoadCustom = () => {
    setCustomHeight(refCustom.current?.contentWindow?.document.body.scrollHeight + 'px');
  };

  useEffect(() => {
    onLoadOriginal();
  }, [isOriginalPreview, post.codeSnippet]);

  useEffect(() => {
    onLoadCustom();
  }, [isCustomPreview, customCode]);

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
      <h1 className="text-3xl font-bold mb-5">✨ Customize Component with AI ✨</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">😀 Original Code Snippet</h2>
        <div className="relative my-4">
          {isOriginalPreview ? (
            <div className="p-4 bg-gray-800 z-0 h-full overflow-hidden rounded border border-sky-500">
              <iframe
                ref={refOriginal}
                onLoad={onLoadOriginal}
                className="w-full h-full border-0"
                srcDoc={`<!DOCTYPE html>
                    <html class='flex w-full h-full'>
                      <head>
                        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                        <script>
                          document.addEventListener('DOMContentLoaded', function() {
                            document.querySelectorAll('a[href="#"]').forEach(function(anchor) {
                              anchor.addEventListener('click', function(e) {
                                e.preventDefault();
                                window.top.location.reload();
                              });
                            });
                          });
                        </script>
                      </head>
                      <body class='w-full h-full flex items-center justify-center min-w-full min-h-full'>
                        <div class='w-full h-full p-6'>${sanitizedSnippet}</div>
                      </body>
                    </html>`}
                title="Preview"
                sandbox="allow-scripts allow-same-origin"
                style={{ minHeight: originalHeight, maxWidth: "100%" }}
              />
            </div>
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
                Copy
              </button>
            )}
            <button
              onClick={toggleOriginalPreview}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
            >
              {isOriginalPreview ? "Show Code" : "Preview"}
            </button>
          </div>
        </div>
      </div>
      <input
        className="w-full p-3 mb-5 rounded bg-blue-950 backdrop-blur-sm "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="📝 Describe your customization here..."
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
          Submit
        </button>
      )}
      {customCode && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">🌟 Customized Code Snippet</h2>
          <div className="relative my-4">
            {isCustomPreview ? (
              <div className="p-4 bg-gray-800 z-0 h-full overflow-hidden rounded border border-sky-500">
                <iframe
                  ref={refCustom}
                  onLoad={onLoadCustom}
                  className="w-full h-full border-0"
                  srcDoc={`<!DOCTYPE html>
                      <html class='flex w-full h-full'>
                        <head>
                          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                          <script>
                            document.addEventListener('DOMContentLoaded', function() {
                              document.querySelectorAll('a[href="#"]').forEach(function(anchor) {
                                anchor.addEventListener('click', function(e) {
                                  e.preventDefault();
                                  window.top.location.reload();
                                });
                              });
                            });
                          </script>
                        </head>
                        <body class='w-full h-full flex items-center justify-center min-w-full min-h-full'>
                          <div class='w-full h-full p-6'>${sanitizedCustomCode}</div>
                        </body>
                      </html>`}
                  title="Preview"
                  sandbox="allow-scripts allow-same-origin"
                  style={{ minHeight: customHeight, maxWidth: "100%" }}
                />
              </div>
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
                  Copy
                </button>
              )}
              <button
                onClick={toggleCustomPreview}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
              >
                {isCustomPreview ? "Show Code" : "Preview"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizeWithAi;
