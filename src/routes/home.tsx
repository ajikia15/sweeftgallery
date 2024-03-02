import { useContext, useEffect } from "react";
import { usePhotos } from "../services/queries";
import { SearchContext } from "../context";
import Card from "../reusable/Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfinitePhotos } from "../services/api";
import { useInView } from "react-intersection-observer";
import SkeletonCard from "../reusable/SkeletonCard";

export default function Home() {
  const { debouncedSearch } = useContext(SearchContext);

  // const photosQuery = usePhotos({ query: debouncedSearch || "cats", page: 1 });

  // if (photosQuery.isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (photosQuery.isError) {
  //   return <div>Error: {photosQuery.error.message}</div>;
  // }
  const { ref, inView } = useInView();
  const photosQuery = useInfiniteQuery({
    queryKey: ["photos", debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      getInfinitePhotos(debouncedSearch || "cats", pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView) {
      photosQuery.fetchNextPage();
    }
  }, [inView, photosQuery.fetchNextPage]);
  if (photosQuery.isLoading) {
    console.log(photosQuery.isLoading);
    return <div>loading...</div>;
  } else if (photosQuery.isError) {
    console.log(photosQuery.error);
    return <div>error: {photosQuery.error.message}</div>;
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-1 mx-auto max-w-[1600px] lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7 lg:gap-9 xl:gap-10 space-y-5 md:space-y-7 lg:space-y-9 xl:space-y-10">
        {photosQuery.data?.pages.map((page) => {
          return page.data.map((photo: any) => (
            <Card key={photo.id} photo={photo} />
          ));
        })}
      </div>
      <div className="h-[20vh] w-25 " ref={ref}>
        <div className=" bg-neutral-900 opacity-90 animate-pulse text-neutral-900"></div>
      </div>
    </>
  );
}
