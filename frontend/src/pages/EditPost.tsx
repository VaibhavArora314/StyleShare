import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../store/atoms/auth';
import usePost from '../hooks/usePost';

const EditPost = () => {
  const token = useRecoilValue(tokenState);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {post, setPost, loading, error} = usePost(id || "");
  const [tagInput, setTagInput] = useState("");
  const [updateError,setUpdateError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedPost = {
      title: post.title,
      description: post.description,
      codeSnippet: post.codeSnippet,
      tags: post.tags,
    };
    try {
      const response = await axios.put(`/api/v1/posts/${post.id}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);
      navigate(`/app/posts/${response.data?.post?.id}`);
    } catch (e) {
      const axiosError = e as AxiosError<{ error: string }>;
      setUpdateError(axiosError.response?.data.error || 'Failed to update the post');
    }
  };

  const handleAddTag = () => {
    if (tagInput.length > 0 && !post.tags.includes(tagInput)) {
      setPost({ ...post, tags: [...post.tags, tagInput] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost({ ...post, tags: post.tags.filter((tag) => tag !== tagToRemove) });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-lg w-full text-center mt-5">
        {error}
      </div>
    );
  }

  if (updateError) {
    return (
      <div className="text-red-500 text-lg w-full text-center mt-5">
        {updateError}
      </div>
    );
  }

  return (
    <div className="p-6 text-white max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
      <p className="mt-4">{error}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="codeSnippet" className="block text-sm font-medium mb-2">
            Code Snippet
          </label>
          <textarea
            id="codeSnippet"
            name="codeSnippet"
            value={post.codeSnippet}
            onChange={(e) => setPost({ ...post, codeSnippet: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium">
            Tags
          </label>
          <div className="mt-1 mb-2 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-gray-700 text-sm rounded"
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
            className="p-2 bg-gray-800 border border-gray-700 rounded"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Add Tag
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
        >
          Save
        </button>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className="ml-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPost;
