export interface Post {
  type: string;
  topics: string[];
  title: string[];
  date: Date;
  detailsArray: detail[];
}

export interface detail {
  summary: string;
  image: File; // Use the File type to store/upload an image
}
