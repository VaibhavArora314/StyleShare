import { useState, useEffect } from 'react';
import { IoMdRefresh } from "react-icons/io";

const CaptchaAdmin = ({ onChange }: { onChange: (isValid: boolean) => void }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value === captchaText) {
      setIsCaptchaValid(true);
      onChange(true);
    } else {
      setIsCaptchaValid(false);
      onChange(false);
    }
  };

  return (
    <div className="mb-4 rounded-lg">
      <div className="flex items-center justify-between mb-4 text-[#000435] bg-gray-100 dark:text-white dark:bg-blue-950 p-2 rounded-lg border border-[#5f67de] dark:border-white">
        <span className="text-xl font-semibold italic line-through">{captchaText}</span>
        <button
          type="button"
          onClick={generateCaptcha}
          className="bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-600"
        >
          <IoMdRefresh size={23} />
        </button>
      </div>
      <input
        type="text"
        className="form-input mt-1 p-2 block w-full text-[#000435] bg-white dark:text-white dark:bg-[#000453] rounded-lg border border-[#5f67de] dark:border-white"
        placeholder="Enter captcha"
        value={inputValue}
        onChange={handleInputChange}
        required
      />
      {!isCaptchaValid && inputValue && (
        <p className="text-sm font-semibold mt-2 text-red-600 text-center">Captcha does not match</p>
      )}
    </div>
  );
};

export default CaptchaAdmin;