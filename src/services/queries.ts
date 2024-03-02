import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getInfinitePhotos, getPhotos } from "./api";
export const usePhotos = ({ query, page }: { query: string; page: number }) =>
  useQuery({
    queryKey: [query, String(page)],
    queryFn: () => getPhotos({ query, page }),
    // staleTime: 1000 * 60 * 5, // 5 wuti iqneba cache
  });

// export const { data, status, error } = useInfiniteQuery({
//   queryKey: ["photos"],
//   //@ts-ignore
//   queryFn: getInfinitePhotos,
//   initialPageParam: 0,
//   getNextPageParam: (lastPage) => lastPage.nextPage,
// });
