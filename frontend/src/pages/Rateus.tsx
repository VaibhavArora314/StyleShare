import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface RateUsProps {
  theme: 'light' | 'dark';
}

const RateUs: React.FC<RateUsProps> = ({ theme }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');

  const handleStarClick = (index: number) => {
    setRating(index + 1); // Rating is 1 to 5 (1 star to 5 stars)
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (rating !== null && comment.trim() !== '') {
      // Handle submit logic here, e.g., send rating and comment to server
      console.log('Rating:', rating);
      console.log('Comment:', comment);
      toast.success('Thanks For Your Feedback :)');
      // You can add more logic as needed, such as clearing form fields or navigating away
    } else {
      toast.error('Please Fill all Details :(');
    }
  };
  const containerClasses = `border-2 border-black p-6 rounded-lg max-w-md w-full mx-auto ${
    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
  } shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105`;

  const starColor = theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500';

  return (
    <div className="flex items-center justify-center h-screen">
      <div className={containerClasses}>
        <h2 className="text-lg font-bold mb-4 text-center">Rate Us</h2>
        <div className="flex items-center justify-center mb-4">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`cursor-pointer ${
                index < (rating || 0) ? `${starColor} text-4xl` : 'text-2xl text-gray-300'
              } transition duration-300 ease-in-out`}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
        <textarea
          className={`w-full h-24 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none mb-4 ${
            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
          }`}
          placeholder="Give Us Your Feedback :)"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <div className="flex justify-center">
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${
              theme === 'dark' ? 'hover:brightness-110' : 'hover:brightness-105'
            }`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateUs;
