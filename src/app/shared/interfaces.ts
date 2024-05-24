export interface Post {
  id?: string;
  authorId: string;
  type: string;
  topics: string[];
  title: string;
  date: Date;
  detailsArray: Detail[];
  likedBy: string[];
  comments: Comment[];
  ratings: Rating[];
  isSelected?:boolean;
}
export interface Detail {
  summary: string;
  images: File[] | string[];
}

export interface Comment {
  content: string;
  userId: string;
}

export interface Rating {
  userId: string;
  value: number;
}

export interface User {
  username: string;
  userId: string;
  bio: string;
  readPosts: string[];
}
