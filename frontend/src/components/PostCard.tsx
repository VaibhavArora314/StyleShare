// import { AiFillLike } from "react-icons/ai";
// import { FaHandsClapping, FaHandHoldingHeart, FaHeart, FaFaceLaughBeam } from "react-icons/fa6";
// import { RiLightbulbFlashFill } from "react-icons/ri";
// import { useEffect, useState } from "react";
// import { IPost, IUser } from "../types";
// import { MdDeleteOutline } from "react-icons/md";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { FaEdit } from "react-icons/fa";

// type Props = {
//   post: IPost;
//   onDelete: (id: string) => void;
//   currentUser: IUser | null;
// };

// const PostCard = ({ post, onDelete, currentUser }: Props) => {
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [reactions, setReactions] = useState<{ type: string, count: number }[]>([]);

//   useEffect(() => {
//     const fetchReactions = async () => {
//       try {
//         const { data } = await axios.get(`/api/v1/posts/${post.id}/reactions`);
//         const formattedReactions = data.reactions.map((reaction: any) => ({
//           type: reaction.type,
//           count: reaction._count.type
//         }));
//         setReactions(formattedReactions);
//       } catch (error) {
//         toast.error("Failed to fetch reactions");
//       }
//     };

//     fetchReactions();
//   }, [post.id]);

//   const handleDelete = async () => {
//     setIsDeleting(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('Please login to delete post');
//         return;
//       }
//       await axios.delete(`/api/v1/posts/delete/${post.id}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       onDelete(post.id);
//       toast.success('Post Deleted successfully!');
//     } catch (error) {
//       toast.error('Failed to delete post!');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const renderReactions = () => {
//     const totalReactions = reactions.reduce((acc, reaction) => {
//       return acc + (reaction.count || 0);
//     }, 0);

//     return (
//       <div className="flex -space-x-2 rtl:space-x-reverse mt-4">
//         {reactions.map((reaction, index) => {
//           let emoji;
//           switch (reaction.type) {
//             case 'Like':
//               emoji = <AiFillLike size={20} color="#87CEEB" />;
//               break;
//             case 'Celebrate':
//               emoji = <FaHandsClapping size={20} color="#E58306" />;
//               break;
//             case 'Support':
//               emoji = <FaHandHoldingHeart size={20} color="#FABDCF" />;
//               break;
//             case 'Love':
//               emoji = <FaHeart size={20} color="#E0286D" />;
//               break;
//             case 'Insightful':
//               emoji = <RiLightbulbFlashFill size={20} color="#FFD700" />;
//               break;
//             case 'Funny':
//               emoji = <FaFaceLaughBeam size={20} color="violet" />;
//               break;
//             default:
//               emoji = null;
//           }
//           return (
//             <div key={index} className="relative w-10 h-10 border-2 rounded-full dark:border-gray-800 flex items-center justify-center bg-gray-700">
//               {emoji}
//             </div>
//           );
//         })}
//         <div className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2  rounded-full  dark:border-gray-800">
//           +{totalReactions}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       key={post.id}
//       className="bg-gray-800 border border-gray-600 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2 transition-transform duration-300 ease-in-out"
//     >
//       <h2 className="text-xl font-bold mb-3 text-white">{post.title}</h2>
//       <p className="text-gray-300 mb-4">
//         {post.description.length > 100
//           ? `${post.description.slice(0, 100)}...`
//           : post.description}
//       </p>
//       <p className="text-gray-400 mb-4">By: {post.author.username}</p>
//       <div className="mt-2 flex flex-wrap gap-2">
//         {post.tags.map((tag, index) => (
//           <span
//             key={index}
//             className="text-sm bg-gray-700 text-white px-3 py-1 rounded-full"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//       <div className="flex justify-between mt-1">
//         <Link
//           to={`/app/posts/${post.id}`}
//           className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-200 rounded-3xl border-2 border-blue-500 hover:border-blue-300 px-4 py-2"
//         >
//           Read More
//         </Link>
//         {currentUser && currentUser.id === post.author.id && (
//           <div className="flex space-x-2">
//             <Link
//               to={`/app/posts/edit/${post.id}`}
//               className="justify-end mt-4 inline-block text-blue-400 hover:text-blue-300 transition-colors duration-200 border-2 border-blue-500 hover:border-blue-300 p-2 rounded-3xl"
//             >
//               <FaEdit size={25} />
//             </Link>
//             <button
//               onClick={handleDelete}
//               disabled={isDeleting}
//               className="justify-end mt-4 inline-block text-red-500 hover:text-red-400 transition-colors duration-200 border-2 border-red-500 hover:border-red-400 p-2 rounded-3xl"
//             >
//               {isDeleting ? "Deleting..." : <MdDeleteOutline  size={25} />}
//             </button>
//           </div>
//         )}
//       </div>
//       {renderReactions()}
//     </div>
//   );
// };

// export default PostCard;


import { AiFillLike } from "react-icons/ai";
import { FaHandsClapping, FaHandHoldingHeart, FaHeart, FaFaceLaughBeam } from "react-icons/fa6";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { IPost, IUser } from "../types";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

type Props = {
  post: IPost;
  onDelete: (id: string) => void;
  currentUser: IUser | null;
};

const PostCard = ({ post, onDelete, currentUser }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [reactions, setReactions] = useState<{ type: string, count: number }[]>([]);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const { data } = await axios.get(`/api/v1/posts/${post.id}/reactions`);
        const formattedReactions = data.reactions.map((reaction: any) => ({
          type: reaction.type,
          count: reaction._count.type
        }));
        setReactions(formattedReactions);
      } catch (error) {
        toast.error("Failed to fetch reactions");
      }
    };

    fetchReactions();
  }, [post.id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to delete post');
        return;
      }
      await axios.delete(`/api/v1/posts/delete/${post.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      onDelete(post.id);
      toast.success('Post Deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete post!');
    } finally {
      setIsDeleting(false);
    }
  };

  const renderReactions = () => {
    const totalReactions = reactions.reduce((acc, reaction) => {
      return acc + (reaction.count || 0);
    }, 0);

    return (
      <div className="flex -space-x-2 rtl:space-x-reverse mt-4">
        {reactions.map((reaction, index) => {
          let emoji;
          switch (reaction.type) {
            case 'Like':
              emoji = <AiFillLike size={20} color="#87CEEB" />;
              break;
            case 'Celebrate':
              emoji = <FaHandsClapping size={20} color="#E58306" />;
              break;
            case 'Support':
              emoji = <FaHandHoldingHeart size={20} color="#FABDCF" />;
              break;
            case 'Love':
              emoji = <FaHeart size={20} color="#E0286D" />;
              break;
            case 'Insightful':
              emoji = <RiLightbulbFlashFill size={20} color="#FFD700" />;
              break;
            case 'Funny':
              emoji = <FaFaceLaughBeam size={20} color="violet" />;
              break;
            default:
              emoji = null;
          }
          return (
            <div key={index} className="relative w-10 h-10 border-2 rounded-full dark:border-gray-800 flex items-center justify-center text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
              {emoji}
            </div>
          );
        })}
        <div className="flex items-center justify-center w-10 h-10 text-xs font-mediumtext-[#000435] bg-white dark:text-white dark:bg-[#000435] border-2  rounded-full  dark:border-gray-800">
          +{totalReactions}
        </div>
      </div>
    );
  };

  return (
    <div
      key={post.id}
      className="text-[#000435] bg-white dark:text-white dark:bg-blue-950 border border-gray-600 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2 transition-transform duration-300 ease-in-out"
    >
      <h2 className="text-xl font-bold mb-3 text-[#000435] bg-white dark:text-white dark:bg-blue-950">{post.title}</h2>
      <p className="text-[#000435] bg-white dark:text-white dark:bg-blue-950 mb-4">
        {post.description.length > 100
          ? `${post.description.slice(0, 100)}...`
          : post.description}
      </p>
      <p className="text-[#000435] bg-white dark:text-white dark:bg-blue-950 mb-4">By: {post.author.username}</p>
      <div className="mt-2 flex flex-wrap gap-2  text-blue-950 bg-white dark:text-white dark:bg-blue-950 ">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm text-blue-950 bg-white dark:text-white dark:bg-blue-950 border-2 border-blue-900 dark:border-white px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between mt-1 ">
        <Link
          to={`/app/posts/${post.id}`}
          className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-200 rounded-3xl border-2 border-blue-500 hover:border-blue-300 px-4 py-2"
        >
          Read More
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
              className="" 
            > <Link className="justify-end mt-4 inline-block text-red-500 hover:text-red-400 transition-colors duration-200 border-2 border-red-500 dark:border-red-500 hover:border-red-400 p-2 rounded-3xl" to={""}>
                {isDeleting ? "Deleting..." : <MdDeleteOutline  size={25} />}
                </Link>
            </button>
          </div>
        )}
      </div>
      {renderReactions()}
    </div>
  );
};

export default PostCard;
