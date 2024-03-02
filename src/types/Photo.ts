export interface Photo {
  id: string;
  urls: {
    small: string;
  };
  likes: number;
  links: {
    download: string;
  };
}
export interface Statistics {
  likes: number;
  downloads: number;
  views: number;
}

export type InfinitePhotosResponse = {
  data: Photo[];
  nextPage: number | null;
  currentPage: number;
};
