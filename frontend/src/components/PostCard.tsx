import { Link } from "react-router-dom";
import { IPost } from "../types";

type Props = {
  post: IPost;
};

const PostCard = ({ post }: Props) => {
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
      <Link
        to={`/app/posts/${post.id}`}
        className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-200"
      >
        Read more
      </Link>
    </div>
  );
};

export default PostCard;
