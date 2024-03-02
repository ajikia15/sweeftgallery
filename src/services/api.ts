import axios from "axios";
import { InfinitePhotosResponse, Statistics } from "../types/Photo";

const BASE_URL = "https://api.unsplash.com";
const clientKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
export const getPhotos = async () => {
  const response = await axios.get(
    `${BASE_URL}/photos?per_page=20&client_id=${clientKey}&page=1&order_by=popular&orientation=portrait`
  );
  const { data } = response;

  return data;
};

export const getInfinitePhotos = async (
  query: string,
  pageParam: number
): Promise<InfinitePhotosResponse> => {
  const response = await axios.get(
    `${BASE_URL}/search/photos?query=${query}&client_id=${clientKey}&per_page=20&page=${pageParam}&orientation=portrait`
  );
  const { data } = response;
  return new Promise((resolve) => {
    resolve({
      data: data.results,
      nextPage: pageParam + 1 <= data.total_pages ? pageParam + 1 : null, // yes!!!!!
      currentPage: pageParam,
    });
  });
};

export const getStatistics = async (id: string): Promise<Statistics> => {
  const response = await axios.get(
    `${BASE_URL}/photos/${id}?client_id=${clientKey}`
  );
  const { data } = response;
  return data;
};
