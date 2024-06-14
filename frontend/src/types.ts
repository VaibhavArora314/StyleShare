export interface IComment {
  id: string;
  content: string;
  user: IUser;
  createdAt: string;
}

export interface IPost {
  id: string;
  title: string;
  description: string;
  codeSnippet: string;
  tags: string[];
  author: {
    id: string;
    username: string;
    email: string;
  },
  likes: number;
  dislikes: number;
  comments: IComment[];
  favoritePosts: []
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  createdAt:string;
  posts: IPost[];
  favoritePosts?: IPost[]; 
}

export interface ILeaderboardUser {
  rank: number;
  userId: string;
  username: string;
  postCount: number;
  totalLikes:number;
}