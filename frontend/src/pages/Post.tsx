import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { PostData } from '../types';
import DOMPurify from 'dompurify';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData>({
    id: "",
    title: "",
    description: "",
    codeSnippet: "",
    tags: [],
    author: {
      id: "",
      username: "",
      email: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState('0px');

  const onLoad = () => {
    setHeight(ref.current?.contentWindow?.document.body.scrollHeight + 'px');
    console.log(ref.current?.contentWindow?.document.body.scrollHeight);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/v1/posts/${id}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError<{
          error: string;
        }>;

        setError(axiosError.response?.data.error || 'Failed to fetch the post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    onLoad();
  }, [isPreview, post.codeSnippet]);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.codeSnippet);
    alert('Code snippet copied to clipboard');
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-lg w-full text-center mt-5">{error}</div>;
  }

  DOMPurify.addHook('uponSanitizeElement', (node, data) => {
    if (data.tagName === 'img' || data.tagName === 'div') {
      const src = node.getAttribute('src');
      const style = node.getAttribute('style');
      if (src && src.startsWith('http')) {
        node.setAttribute('src', src);
      }
      if (style && style.includes('url(')) {
        node.setAttribute('style', style);
      }
    }
  });

  const sanitizedSnippet = DOMPurify.sanitize(post?.codeSnippet || '', {
    ADD_ATTR: ['style', 'background'],
  });

  return (
    <div className="p-6 text-white max-w-screen-xl mx-auto">
      {post && (
        <>
          <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
          <p className="mb-4">{post.description}</p>
          <div className="relative mb-4">
            {isPreview ? (
              <div className="p-4 bg-gray-800 z-0 h-full overflow-hidden rounded border border-gray-700">
                <iframe
                  ref={ref}
                  onLoad={onLoad}
                  className="w-full h-full border-0"
                  srcDoc={
                    `<html class='flex w-full h-full'>
                      <head>
                        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                        // <link rel="stylesheet" href="https://flowbite.com/docs/flowbite.css?v=2.3.0a"> // Uncomment this line to use components from Flowbite website
                        <script>
                          document.addEventListener('DOMContentLoaded', function() {
                            document.querySelectorAll('a[href="#"]').forEach(function(anchor) {
                              anchor.addEventListener('click', function(e) {
                                e.preventDefault();
                                window.top.location.reload();
                              });
                            });
                          });
                        </script>
                        </head>
                      <body class='w-full h-full flex items-center justify-center minw-full min-h-full'>
                        <div class='w-full h-full p-6'>${sanitizedSnippet}</div>
                      </body>
                    </html>`}
                  title="Preview"
                  sandbox="allow-scripts allow-same-origin"
                  style={{ minHeight: height, maxWidth: '100%' }}
                />
              </div>
            ) : (
              <pre className="p-4 bg-gray-800 border border-gray-700 rounded overflow-auto max-h-96 line-numbers language-html">
                <code>{post.codeSnippet}</code>
              </pre>
            )}
            <div className="absolute top-2 right-3 flex space-x-2">
              {isPreview ? null :
                <button
                  onClick={handleCopy}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                >
                  Copy
                </button>}
              <button
                onClick={togglePreview}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
              >
                {isPreview ? 'Show Code' : 'Preview'}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-700 text-sm rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Author</h3>
            <p>Username: {post.author.username}</p>
            <p>Email: {post.author.email}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
