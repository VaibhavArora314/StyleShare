import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import { IPost } from "../types";
import CodeEditorAndPreview from "../components/CodeEditorAndPreview";
import { BiSolidMessageEdit } from "react-icons/bi";

const UpdatePost = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const [tagInput, setTagInput] = useState("");
  const { postId } = useParams<{ postId: string }>();
  const token = useRecoilValue(tokenState);
  const navigate = useNavigate();
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/v1/admin/postbyid/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(response.data.post);
    } catch (error) {
      console.error("Error fetching post", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedPost = {
      title: post?.title,
      description: post?.description,
      codeSnippet: post?.codeSnippet,
      jsCodeSnippet: post?.jsCodeSnippet,
      tags: post?.tags,
    };
    try {
      const response = await axios.patch(`/api/v1/admin/posts/update/${postId}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      navigate('/admin/posts');
    } catch (e) {
      const axiosError = e as AxiosError<{ error: string }>;
      setUpdateError(axiosError.response?.data.error || 'Failed to update the post');
    }
  };

  const handleAddTag = () => {
    if (tagInput.length > 0 && post && !post.tags.includes(tagInput)) {
      setPost({ ...post, tags: [...post.tags, tagInput] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (post) {
      setPost({ ...post, tags: post.tags.filter((tag) => tag !== tagToRemove) });
    }
  };

  if (!post) return <>Loading...</>;

  return (
    <div>
    <div className="flex-1 flex flex-col lg:ml-80">
      <div className="mx-3 mb-5">
        <span className="flex  items-center  text-xl font-bold decoration-sky-500 decoration-dotted underline">
          <div className='inline-block p-2 text-white bg-[#000435] rounded-lg mr-2'>
            <BiSolidMessageEdit size={23} />
          </div>
          Update Post
        </span>
      </div>
      <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <p className="mt-4">{updateError}</p>
        <form onSubmit={handleUpdate} className="space-y-4 m-3">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={post.description}
              onChange={(e) => setPost({ ...post, description: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <CodeEditorAndPreview
            codeSnippet={post.codeSnippet}
            jsCodeSnippet={post.jsCodeSnippet}
            setCodeSnippet={(codeSnippet) => setPost({ ...post, codeSnippet })}
            setJsCodeSnippet={(jsCodeSnippet) => setPost({ ...post, jsCodeSnippet })}
          />
          <div>
            <label htmlFor="tags" className="block text-gray-700 text-sm font-semibold">
              Tags
            </label>
            <div className="mt-1 mb-2 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 text-[#fff] bg-gray-700 text-sm rounded"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-gray-300 hover:text-white"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              id="tagInput"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="p-2 text-[#000435] bg-white  border-2 border-blue-500 rounded"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
            >
              Add Tag
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/posts')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default UpdatePost;
