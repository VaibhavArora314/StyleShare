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
  jsCodeSnippet: string;
  tags: string[];
  author: {
    id: string;
    username: string;
    email: string;
    totalFollowers:number
  },
  comments: IComment[];
  favoritePosts: [];
  userReaction: 'Like' | 'Celebrate' | 'Support' | 'Love' | 'Insightful' | 'Funny' | null; 
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  posts: IPost[];
  favoritePosts?: IPost[];
  isFollowing: boolean;
  _count: {
    following: number;
  };
  twitter?: string;
  github?: string;
  linkedin?: string;
  portfolio?:string;
  avatar?:string;
}

export interface ILeaderboardUser {
  rank: number;
  userId: string;
  username: string;
  postCount: number;
  totalReactions:number;
  avatar?:string;
}

export interface IUserFeedback {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  visible: boolean;
  createdAt: string;
  user: IUser;
}
