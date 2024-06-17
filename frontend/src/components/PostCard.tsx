import { Link } from "react-router-dom";
import { IPost, IUser, IReaction } from "../types";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";

type Props = {
  post: IPost;
  onDelete: (id: string) => void; 
  currentUser: IUser | null;
};

const PostCard = ({ post, onDelete, currentUser }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();
  const [reactions, setReactions] = useState<IReaction[]>([]); 
  const [userReaction, setUserReaction] = useState<string | null>(null);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(`/api/v1/posts/${post.id}/reactions`);
        setReactions(response.data.reactions);
      } catch (error) {
        console.error("Failed to fetch reactions", error);
      }
    };

    fetchReactions();
  }, [post]);

  useEffect(() => {
    if (currentUser) {
      const userReaction = reactions.find(reaction => reaction.userId === currentUser.id);
      setUserReaction(userReaction ? userReaction.type : null);
    }
  }, [reactions, currentUser]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to remove a post from favorites');
        return;
      }
      await axios.delete(`/api/v1/posts/delete/${post.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      onDelete(post.id); 
      toast.success('Post Deleted successfully!')
    } catch (error) {
      console.error("Failed to delete post", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReaction = async (type: IReaction['type']) => {
    if (!currentUser) {
      toast.error('Please login to react to a post');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to react to a post');
        return;
      }
      const response = await axios.post(`/api/v1/posts/${post.id}/reaction`, { type }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setReactions(prevReactions => [
        ...prevReactions.filter(reaction => reaction.userId !== currentUser.id),
        { type, userId: currentUser.id }
      ]);
      toast.success(response.data.message);
    } catch (error:any) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.error.message || 'User is not verified!');
      } else {
        toast.error('Failed to add reaction');
      }
    }
  };

  const handleRemoveReaction = async (type: IReaction['type']) => {
    if (!currentUser) {
      toast.error('Please login to remove a reaction');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to remove a reaction');
        return;
      }
      const response = await axios.delete(`/api/v1/posts/${post.id}/reaction/${type}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setReactions(reactions.filter(reaction => reaction.type !== type || reaction.userId !== currentUser.id));
      toast.success(response.data.message);
    } catch (error:any) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.error.message || 'User is not verified!');
      } else {
        toast.error('Failed to remove reaction');
      }
    }
  };

  const emojis: IReaction['type'][] = ["😄", "👍", "🎉", "💖", "👏", "💡"];

  const aggregatedReactions = reactions.reduce<{ [key: string]: number }>((acc, reaction) => {
    acc[reaction.type] = (acc[reaction.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      key={post.id}
      className="bg-gray-800 border border-gray-600 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2 transition-transform duration-300 ease-in-out"
    >
      <h2 className="text-xl font-bold mb-3 text-white">{post.title}</h2>
      <p className="text-gray-300 mb-4">
        {post.description.length > 100
          ? `${post.description.slice(0, 100)}...`
          : post.description}
      </p>
      <p className="text-gray-400 mb-4">By: {post.author.username}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm bg-gray-700 text-white px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <Link
          to={`/app/posts/${post.id}`}
          className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-200 rounded-3xl border-2 border-blue-500 hover:border-blue-300 px-4 py-2"
        >
          {t("readMore")}
        </Link>
        {currentUser && currentUser.id === post.author.id && (
          <div className="flex space-x-2">
            <Link
              to={`/app/posts/edit/${post.id}`}
              className="justify-end mt-4 inline-block text-blue-400 hover:text-blue-300 transition-colors duration-200 border-2 border-blue-500 hover:border-blue-300 p-2 rounded-3xl"
            >
              <FaEdit size={25} />
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="justify-end mt-4 inline-block text-red-500 hover:text-red-400 transition-colors duration-200 border-2 border-red-500 hover:border-red-400 p-2 rounded-3xl"
            >
              {isDeleting ? "Deleting..." : <MdDeleteOutline size={25} />}
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 rounded-3xl flex flex-wrap justify-evenly border-2 border-sky-500 hover:border-blue-300">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => userReaction === emoji ? handleRemoveReaction(emoji) : handleReaction(emoji)}
            className="text-lg p-2 m-1"
          >
            <span className={userReaction === emoji ? 'opacity-50' : ''}>{emoji}</span>
            <span className="text-white">{aggregatedReactions[emoji] ? `x${aggregatedReactions[emoji]}` : ''}</span>
          </button>
        ))}
    </div>
    </div>
  );
};

export default PostCard;
