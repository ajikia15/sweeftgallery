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
export interface IndividualPhoto extends Photo {
  views: number;
  downloads: number;
}

export type InfinitePhotosResponse = {
  data: Photo[];
  nextPage: number | null;
  currentPage: number;
};
