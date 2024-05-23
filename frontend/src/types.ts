export interface PostData {
  id: string;
  title: string;
  description: string;
  codeSnippet: string;
  tags: string[];
  author: {
    id: string;
    username: string;
    email: string;
  };
}
