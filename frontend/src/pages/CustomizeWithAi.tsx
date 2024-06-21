import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IPost } from "../types";
import { userState } from "../store/atoms/auth";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import PostCodeWithPreview from "../components/PostCodeWithPreview";
import bgHero from "../assets/bgHero.png";
import { GoogleGenerativeAI } from '@google/generative-ai';

const CustomizeWithAi = () => {
  const user = useRecoilValue(userState);
  const [customCssCode, setCustomCssCode] = useState("");
  const [customJsCode, setCustomJsCode] = useState("");
  const [query, setQuery] = useState("");
  const location = useLocation();
  const post: IPost = location.state.post;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleCustomize = async () => {
    if (!user.verified) {
      toast.error("Please verify to access this feature 😟");
      return;
    }

    if (query === "") {
      toast.error("Please fill the input 😟");
      return;
    }
    toast.promise(
      (async () => {
        setLoading(true);
        try {
          const originalCodeSnippetCss = post.codeSnippet;
          const originalCodeSnippetJs = post.jsCodeSnippet;

          let key = import.meta.env.VITE_API_KEY;

          if (!key) {
            throw new Error("API_KEY is not defined in the environment variables.");
          }

          const genAI = new GoogleGenerativeAI(key);
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

          const promptForCss = `This is my tailwind css code: ${originalCodeSnippetCss}\n\n
                                I want you to modify it and put ${query}\n\n
                                and also write the code in vs code format like one below other tag and just give me code don't explain it.`;
          const promptForJs = `This is my Javascript code: ${originalCodeSnippetJs}\n\n
                                I want you to modify it and put ${query}\n\n
                                and also write the code in vs code format like one below other and just give me code don't explain it.`;

          const [resultForCss, resultForJs] = await Promise.all([
            model.generateContent(promptForCss),
            model.generateContent(promptForJs),
          ]);

          const responseForCss = resultForCss.response;
          const responseForJs = resultForJs.response;

          const cssText = await responseForCss.text();
          const jsText = await responseForJs.text();

          setCustomCssCode(cssText);
          setCustomJsCode(jsText);
          setLoading(false);
        } catch (error) {
          console.error("Failed to customize the code", error);
          setLoading(false);
          throw error;
        }
      })(),
      {
        loading: "Sending your request to server ⏳",
        success: "Customized successfully 😄",
        error: "Something went wrong 😔",
      }
    );
  };

  return (
    <div className="-mt-20 w-full text-[#000435] bg-white dark:text-white dark:bg-[#000435] py-16 px-4" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="customize-page p-6 max-w-screen-xl mx-auto text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
        <h1 className="text-3xl font-bold mb-5 text-[#9b42c4] bg-white dark:text-white dark:bg-[#000435]">✨ {t("postdet.cus")} ✨</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">😀 {t("custom.og")}</h2>
          <PostCodeWithPreview
            id={post.id}
            isOwner={false}
            codeSnippet={post.codeSnippet}
            jsCodeSnippet={post.jsCodeSnippet}
            handleCustomizeAi={() => {}}
            showCustomizeAiOption={false}
            showTogether={false}
          />
        </div>
        <input
          className="w-full p-3 mb-5 rounded text-[#000435] bg-white dark:text-white dark:bg-[#000435] border-2 border-sky-500 backdrop-blur-sm"
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
        {(customCssCode || customJsCode) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#9b42c4] dark:text-white mb-2">
              🌟 Customized Code Snippet
            </h2>
            <PostCodeWithPreview
              id={post.id}
              isOwner={false}
              codeSnippet={customCssCode}
              jsCodeSnippet={customJsCode}
              handleCustomizeAi={() => {}}
              showCustomizeAiOption={false}
              showTogether={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizeWithAi;
