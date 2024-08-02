import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import { IFeedback } from "../types";
import { ColorRing } from 'react-loader-spinner';
import { VscFeedback } from "react-icons/vsc";
import toast from "react-hot-toast";

const GetFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useRecoilValue(tokenState);

  document.title = "Style Share Admin | Manage Feedbacks 💬"

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("/api/v1/admin/getfeedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setLoading(true);
      }
    };

    fetchFeedbacks();
  }, [token]);

  const handleToggleVisibility = async (feedbackId: string) => {
    try {
      await axios.patch(
        `/api/v1/admin/toggleFeedbackVisibility/${feedbackId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Feedback visibility updated");
      setFeedbacks(feedbacks.map(feedback => 
        feedback.id === feedbackId ? { ...feedback, visible: !feedback.visible } : feedback
      ));
    } catch (error) {
      console.error("Error updating feedback visibility:", error);
      toast.error("Error updating feedback visibility");
    }
  };

  return (
    <div>
      <div className="flex-1 flex flex-col lg:ml-80">
        <div className="mx-5 mb-5">
          <span className="flex items-center text-xl font-bold decoration-sky-500 decoration-dotted underline">
            <div className='inline-block p-2 text-white bg-[#000435] rounded-lg mr-2'>
              <VscFeedback size={23} />
            </div>
            All Feedbacks
          </span>
        </div>
        {loading ? 
          <div className="flex justify-center items-center h-80">
            <ColorRing
              visible={true}
              height="100"
              width="100"
              colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)', '#000435', 'rgb(14 165 233)']}
            />
          </div>
          :
          <div className="mx-5 lg:mr-11 overflow-x-auto shadow-md rounded-xl mb-5">
            <table className="w-full rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs md:text-sm text-white uppercase bg-sky-500 text-center">
                <tr>
                  <th scope="col" className="px-6 py-3">User</th>
                  <th scope="col" className="px-8 py-3">Comment</th>
                  <th scope="col" className="px-6 py-3">Rating</th>
                  <th scope="col" className="px-6 py-3">Created At</th>
                  <th scope="col" className="px-16 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map(feedback => (
                  <tr key={feedback.id} className="text-xs md:text-sm text-center border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                    <td className="px-8">
                      <span className="font-bold">{feedback.user.username}</span>
                    </td>
                    <td className="px-8 py-4 font-semibold">{feedback.comment}</td>
                    <td className="px-8 py-4 font-semibold">{feedback.rating}</td>
                    <td className="px-8 py-4 font-semibold">{new Date(feedback.createdAt).toLocaleDateString()}</td>
                    <td className="px-2 py-4 grid justify-center text-center">
                      <button 
                        className={`font-semibold rounded-md p-2 text-white border-2 ${feedback.visible ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'}`}
                        onClick={() => handleToggleVisibility(feedback.id)}
                      >
                        {feedback.visible ? 'Hide from Testimonials' : 'Show on Testimonials'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default GetFeedbacks;
