import { Link } from "react-router-dom";
import { IPost } from "../types";

type Props = {
  post: IPost;
};

const PostCard = ({ post }: Props) => {
  return (
    <div
      key={post.id}
      className="bg-gray-800 border border-gray-600 p-4 rounded hover:border-blue-500 hover:-translate-y-2 transition ease-in-out"
    >
      <h2 className="text-lg font-semibold mb-2 text-white">{post.title}</h2>
      <p className="text-gray-400 mb-2">
        {post.description.length > 100
          ? `${post.description.slice(0, 100)}...`
          : post.description}
      </p>
      <p className="text-gray-500">By: {post.author.username}</p>
      <div className="mt-2 flex flex-wrap">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm bg-gray-700 text-white px-2 py-1 rounded mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        to={`/app/posts/${post.id}`}
        className="text-blue-400 hover:text-blue-300"
      >
        Read more
      </Link>
    </div>
  );
};

export default PostCard;
