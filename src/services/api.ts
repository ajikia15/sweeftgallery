import axios from "axios";

const BASE_URL = "https://api.unsplash.com";
const clientKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
export const getPhotos = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const response = await axios.get(
    `${BASE_URL}/search/photos?query=${query}&client_id=${clientKey}&per_page=20&page=${page}`
  );
  const { data } = response;

  console.log(data);
  return data;
};
