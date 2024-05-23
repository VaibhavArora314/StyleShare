import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const token = useRecoilValue(tokenState);
  const navigate = useNavigate();

  const handleAddTag = () => {
    if (tagInput.length > 0 && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      codeSnippet,
      tags,
    };
    console.log(newPost);

    try {
      const response = await axios.post("/api/v1/posts", newPost, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response);
      navigate(`/app/posts/${response.data?.post?.id}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 text-white max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="codeSnippet" className="block text-sm font-medium">
            Code Snippet
          </label>
          <textarea
            id="codeSnippet"
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium">
            Tags
          </label>
          <div className="mt-1 mb-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
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
          {/* <form onSubmit={handleAddTag} className="flex items-center"> */}
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
          {/* </form> */}
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-green-600 hover:bg-green-700 rounded text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPost;
