import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { IComment } from '../types';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Comment = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/posts/${id}/comments`);
      setComments(response.data.comments);
      setLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      setError(axiosError.response?.data.error || 'Failed to fetch comments');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to comment');
      return;
    }
    setSubmitting(true);
    try {
      const response = await axios.post(`/api/v1/posts/${id}/comments`, { content: commentContent }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchComments();
      setCommentContent('');
      toast.success(response.data.message);
    } catch (error:any) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.error.message || 'User is not verified!');
      } else {
        toast.error('Failed to submit comment. Please try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };
  

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-lg w-full text-center mt-5">
        {error}
      </div>
    );
  }
  
  return (
    <div className="">
      <div>
        <h3 className="text-xl font-semibold mb-4">{comments.length} Comments</h3>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment: IComment) => (
              <li key={comment.id} className="border-b border-gray-700 pb-2">
                <p className="text-base"><strong>@{comment.user.username} <span className='text-xs text-gray-500'> {new Date(comment.createdAt).toLocaleString()}</span></strong></p>
                <p className="text-sm text-white">{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">Be the first one to comment...</p>
        )}
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-5">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded mb-2"
          rows={2}
          placeholder="Add a comment..."
          disabled={submitting}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Comment'}
        </button>
      </form>
      {submitting && <Loader />}
    </div>
  );
};

export default Comment;
