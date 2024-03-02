import { useContext, useEffect } from "react";
import { usePhotos } from "../services/queries";
import { SearchContext } from "../context";
import Card from "../reusable/Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfinitePhotos } from "../services/api";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { debouncedSearch } = useContext(SearchContext);

  // const photosQuery = usePhotos({ query: debouncedSearch || "cats", page: 1 });

  // if (photosQuery.isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (photosQuery.isError) {
  //   return <div>Error: {photosQuery.error.message}</div>;
  // }

  const photosQuery = useInfiniteQuery({
    queryKey: ["photos", debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      getInfinitePhotos(debouncedSearch || "cats", pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.nextPage,
  });
  if (photosQuery.isLoading) {
    return <div>loading...</div>;
  } else if (photosQuery.isError) {
    return <div>error: {photosQuery.error.message}</div>;
  }

  function help() {
    console.log;
    photosQuery.fetchNextPage();
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 mx-auto max-w-[1200px] lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7 lg:gap-9 xl:gap-10 space-y-5 md:space-y-7 lg:space-y-9 xl:space-y-10">
        {photosQuery.data?.pages.map((page) => {
          return page.data.map((photo: any) => (
            <Card key={photo.id} photo={photo} />
          ));
        })}
        {!photosQuery.isLoading && !photosQuery.isError && (
          <div
            className="break-inside-avoid bg-yellow-400"
            onClick={() => {
              help();
            }}
          >
            hello gays
          </div>
        )}
      </div>
    </div>
  );
}
