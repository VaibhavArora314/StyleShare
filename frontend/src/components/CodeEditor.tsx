import { useEffect, useRef, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { CiLight, CiDark } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import toast, { Toaster } from 'react-hot-toast';

const CodeEditor = () => {
  const initialCode = `<div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-blue-400 py-6 sm:py-12">
    <div class="relative px-6 pt-10 pb-8 shadow-2xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div class="mx-auto max-w-md text-white">
      <h1 class="text-3xl font-semibold">💅 Style Share</h1>
        <div class="divide-y divide-gray-300/50">
          <div class="space-y-6 py-8 text-base leading-7">
            <p>An advanced online playground for Tailwind CSS, including support for things like:</p>
            <ul class="space-y-4">
              <li class="flex items-center">
                <p class="ml-4">
                  🤜 Customizing your
                  <code class="text-sm font-bold">tailwind.config.js</code> file
                </p>
              </li>
              <li class="flex items-center">
                <p class="ml-4">
                  🤜 Extracting classes with
                  <code class="text-sm font-bold">@apply</code>
                </p>
              </li>
              <li class="flex items-center">
                <p class="ml-4">🤜 Code completion with instant preview</p>
              </li>
            </ul>
            <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
          </div>
          <div class="pt-8 text-base font-semibold leading-7">
            <p class="mb-3">Want to dig deeper into Tailwind?</p>
            <p>
              <a href="https://tailwindcss.com/docs" class="text-blue-500 p-2 bg-white rounded-lg hover:text-blue-600">Read the docs &rarr;</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  const [code, setCode] = useState(initialCode);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  );
  const outputRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const updateOutput = (code: string) => {
    const doc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>${code}</body>
      </html>
    `;
    if (outputRef.current) {
      outputRef.current.srcdoc = doc;
    }
  };

  useEffect(() => {
    updateOutput(code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handlePublish = () => {
    navigate('/app/new-post', { state: { codeSnippet: code } });
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy code!');
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className='flex flex-col h-screen -mt-28 sm:-mt-8'>
      <Toaster />
      <nav className={`bg-${theme === 'dark' ? 'gray-900' : 'white'} text-white p-16 sm:p-5 mt-20 sm:mt-1`}>
        <div className="flex justify-between items-center">
          <div className="flex-1"></div>
          <button 
            onClick={handleCopyToClipboard}
            className='p-2 rounded cursor-pointer mr-2 border-2 font-mono border-red-100 focus:outline-none bg-[#000435] text-white hover:bg-[#801fc4] '>
            {t("copy")}
          </button>
          <button 
            onClick={handlePublish}
            className='p-2 rounded cursor-pointer  border-2 font-mono border-red-100 focus:outline-none bg-[#000435] text-white hover:bg-[#801fc4]'>
            {t("share")}
          </button>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`p-2 rounded cursor-pointer focus:outline-none bg-${theme === 'dark' ? 'gray-600 text-white hover:bg-gray-700' : 'gray-200 text-black hover:bg-gray-300'}`}
            >
              {theme === 'light' ? <CiDark className="text-xl" /> : <CiLight className="text-xl" />}
            </button>
          </div>
        </div>
      </nav>
      <div className="flex flex-col lg:flex-row flex-1">
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full">
          <MonacoEditor
            height="100%"
            language="html"
            theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
            value={code}
            onChange={(newValue) => {
              if (newValue !== undefined) {
                setCode(newValue);
              }
            }}
          />
        </div>
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full">
          <iframe
            ref={outputRef}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: "white"
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
