export interface IPost {
    id: string;
    title: string;
    description: string;
    codeSnippet: string;
    jsCodeSnippet: string;
    tags: string[];
    createdAt:number;
    author: {
      id: string;
      username: string;
      email: string;
      totalFollowers:number
    },
    comments:[]
    reactions:[];
    favoritePosts: [];
    userReaction: 'Like' | 'Celebrate' | 'Support' | 'Love' | 'Insightful' | 'Funny' | null; 
  }
  
  export interface IUser {
    id: string;
    username: string;
    email: string;
    verified: boolean;
    createdAt:string;
    posts: IPost[];
    favoritePosts?: IPost[]; 
    isFollowing: boolean;
    _count: {
      following: number
    }
  }