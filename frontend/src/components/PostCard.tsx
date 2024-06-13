import { Link } from "react-router-dom";
import { IPost, IUser } from "../types";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

type Props = {
  post: IPost;
  onDelete: (id: string) => void; 
  currentUser: IUser ;
};

const PostCard = ({ post,onDelete,currentUser }: Props) => {

  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();

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
      toast.error('Post Deleted successfully !')
    } catch (error) {
      console.error("Failed to delete post", error);
    } finally {
      setIsDeleting(false);
    }
  };

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
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="justify-end ml-4 mt-4 inline-block text-red-500 hover:text-red-400 transition-colors duration-200 border-2 border-red-500 hover:border-red-400 p-2 rounded-3xl"
        >
          {isDeleting ? "Deleting..." : <MdDeleteOutline size={25} />}
        </button>
      )}
            </div>

    </div>
  );
};

export default PostCard;
