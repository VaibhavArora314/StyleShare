import { IUser } from "../types.ts";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "../styles/Model.css";
import { tokenState } from "../store/atoms/auth.ts";
import { useRecoilValue } from "recoil";
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";

interface FeedbackFormProps {
    user: IUser | null,
    dismiss: () => void,
    open: boolean,
}

export function FeedbackForm({ user, dismiss, open }: FeedbackFormProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const token = useRecoilValue(tokenState);

    const handleRatingChange = (rate: number) => {
        setRating(rate);
    };

    const handleSubmit = async () => {
        if (!user) {
            toast.error("You must be logged in to submit feedback");
            return;
        }

        try {
            const response = await axios.post("/api/v1/user/feedback", {
                rating,
                comment,
                userId: user.id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                toast.success("Thank you for your feedback");
                dismiss();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.error || "Failed to submit feedback");
            } else {
                toast.error("Failed to submit feedback");
            }
        }
    };

    return (
        <Modal open={open} onClose={dismiss} center classNames={{ modal: 'customModal', overlay: 'customOverlay' }}>
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What you think about style share ?</h3>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                        <div className="flex space-x-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                    onClick={() => handleRatingChange(star)}
                                >
                                    {rating >= star ? <MdOutlineStar /> : <MdOutlineStarOutline />}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Feedback</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full h-32 rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            rows={4}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={dismiss}
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="inline-flex justify-center px-5 rounded-md border border-transparent bg-sky-500 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
