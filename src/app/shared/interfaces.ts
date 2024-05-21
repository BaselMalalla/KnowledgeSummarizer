export interface Post {
  author?: string; // remove "?" later
  type: string;
  topics: string[];
  title: string[];
  date: Date;
  detailsArray: detail[];
}

export interface detail {
  summary: string;
  images: File[];
}
