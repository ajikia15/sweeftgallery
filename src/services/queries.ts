import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getInfinitePhotos, getPhotos, getStatistics } from "./api";
import { InfinitePhotosResponse } from "../types/Photo";
export const usePhotos = ({ query, page }: { query: string; page: number }) =>
  useQuery({
    queryKey: [query, String(page)],
    queryFn: () => getPhotos({ query, page }),
    // staleTime: 1000 * 60 * 5, // 5 wuti iqneba cache
  });

export const useInfinitePhotos = ({
  query,
}: {
  query: string;
  pageParam: number;
}) =>
  useInfiniteQuery({
    queryKey: ["photos", query],
    queryFn: ({ pageParam = 1 }) =>
      getInfinitePhotos(query || "cats", pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: InfinitePhotosResponse) => lastPage.nextPage,
  });

export const useStatistics = (id: string) =>
  useQuery({
    queryKey: ["photo", id],
    queryFn: () => getStatistics(id),
  });
