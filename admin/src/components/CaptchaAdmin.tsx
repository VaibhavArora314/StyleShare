import { useState, useEffect } from 'react';

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
    <div className="mb-4 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-center mb-4">Captcha Generator</h3>
      <div className="flex items-center justify-between mb-4 bg-gray-100 p-2 rounded-lg">
        <span className="text-2xl font-mono">{captchaText}</span>
        <button
          type="button"
          onClick={generateCaptcha}
          className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600"
        >
          &#8634;
        </button>
      </div>
      <input
        type="text"
        className="form-input mt-1 p-2 block w-full border rounded-lg"
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
