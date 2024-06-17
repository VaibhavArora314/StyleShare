import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaHandsClapping, FaHandHoldingHeart, FaHeart, FaFaceLaughBeam } from "react-icons/fa6";
import { RiLightbulbFlashFill } from "react-icons/ri";

interface ReactionButtonProps {
  postId: string;
  initialReaction: 'Like' | 'Celebrate' | 'Support' | 'Love' | 'Insightful' | 'Funny' | null;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({ postId, initialReaction }) => {
  const [reaction, setReaction] = useState<typeof initialReaction>(initialReaction);
  const [showEmojis, setShowEmojis] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchInitialReaction = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await axios.get(`/api/v1/posts/${postId}/reaction`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data.reaction) {
          setReaction(response.data.reaction.type);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialReaction();
  }, [postId]);

  const handleReaction = async (type: 'Like' | 'Celebrate' | 'Support' | 'Love' | 'Insightful' | 'Funny') => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to react to posts");
        return;
      }

      await axios.post(
        `/api/v1/posts/${postId}/react`,
        { type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReaction(type);
      toast.success(`Reacted with ${type}`);
    } catch (error:any) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.error.message || 'User is not verified!');
      }
    }
  };

  const handleDefaultReaction = async () => {
    await handleReaction('Like');
  };

  const handleRemoveReaction = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to remove reaction");
        return;
      }

      await axios.delete(`/api/v1/posts/${postId}/react`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReaction(null);
      toast.success("Reaction removed");
    } catch (error:any) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.error.message || 'User is not verified!');
      }
    }
  };

  const reactionEmoji = (reaction: 'Like' | 'Celebrate' | 'Support' | 'Love' | 'Insightful' | 'Funny') => {
    switch (reaction) {
      case 'Like':
        return <AiFillLike size={30} color='#87CEEB' />;
      case 'Celebrate':
        return <FaHandsClapping size={30} color='#E58306' />;
      case 'Support':
        return <FaHandHoldingHeart size={30} color='#FABDCF' />;
      case 'Love':
        return <FaHeart size={30} color='#E0286D' />;
      case 'Insightful':
        return <RiLightbulbFlashFill size={30} color='#FFD700' />;
      case 'Funny':
        return <FaFaceLaughBeam size={30} color='violet' />;
      default:
        return null;
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowEmojis(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowEmojis(false);
    }, 300);
  };

  return (
    <div
      className="relative inline-block my-1 mb-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={reaction ? handleRemoveReaction : handleDefaultReaction}
        className="p-2 bg-blue-950 backdrop-blur-sm rounded-lg border border-sky-500"
      >
        {reaction ? reactionEmoji(reaction) : <AiOutlineLike size={30} color='#87CEEB' />}
      </button>
      {showEmojis && (
        <div
          className="absolute flex space-x-5 mt-1 bg-blue-950 backdrop-blur-sm p-3 rounded-lg border border-sky-500 shadow-lg z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button onClick={() => handleReaction('Like')} className="focus:outline-none emoji-button"><AiFillLike size={30} color='#87CEEB' /></button>
          <button onClick={() => handleReaction('Celebrate')} className="focus:outline-none emoji-button"><FaHandsClapping size={30} color='#E58306' /></button>
          <button onClick={() => handleReaction('Support')} className="focus:outline-none emoji-button"><FaHandHoldingHeart size={30} color='#FABDCF' /></button>
          <button onClick={() => handleReaction('Love')} className="focus:outline-none emoji-button"><FaHeart size={30} color='#E0286D' /></button>
          <button onClick={() => handleReaction('Insightful')} className="focus:outline-none emoji-button"><RiLightbulbFlashFill size={30} color='#FFD700' /></button>
          <button onClick={() => handleReaction('Funny')} className="focus:outline-none emoji-button"><FaFaceLaughBeam size={29} color='violet' /></button>
        </div>
      )}
    </div>
  );
};

export default ReactionButton;
