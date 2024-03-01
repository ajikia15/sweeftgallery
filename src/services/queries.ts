import { useQuery } from "@tanstack/react-query";
import { getPhotos } from "./api";
export const usePhotos = ({ query, page }: { query: string; page: number }) =>
  useQuery({
    queryKey: [query, String(page)],
    queryFn: () => getPhotos({ query, page }),
    // staleTime: 1000 * 60 * 5, // 5 wuti iqneba cache
  });
