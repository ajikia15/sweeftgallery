import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context";
import { useInfinitePhotos } from "../services/queries";
import { Photo } from "../types/Photo";
import Card from "../reusable/Card";
import { useInView } from "react-intersection-observer";
export default function History() {
  const { searchHistory, deleteHistoryItem, clearHistory } =
    useContext(SearchContext);
  const { ref, inView } = useInView();

  const [search, setSearch] = useState("");

  const handleDelete = (search: string) => {
    deleteHistoryItem(search);
  };
  const handleHistoryClick = (search: string) => {
    setSearch(search);
  };
  const photoHistoryQuery = useInfinitePhotos({
    query: search,
    pageParam: 1,
  });
  useEffect(() => {
    if (inView) {
      photoHistoryQuery.fetchNextPage();
    }
  }, [inView, photoHistoryQuery.fetchNextPage]);
  if (search !== "")
    return (
      <div className="text-gray-200">
        <h1 className="font-bold font-3xl text-center">
          Results for {search}:
        </h1>
        <ul className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 grid-rows-1 mx-auto max-w-[1600px] lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7 lg:gap-9 xl:gap-10 ">
          {photoHistoryQuery.data?.pages.map((page) => {
            return page.data.map((photo: Photo) => (
              <Card key={photo.id} photo={photo} />
            ));
          })}
        </ul>
        <div className="h-[50vh] w-25 " ref={ref}>
          <div className=" bg-neutral-900 opacity-90 animate-pulse text-neutral-900"></div>
        </div>
      </div>
    );
  else
    return (
      <div className="text-gray-200 w-full space-y-5 mt-5">
        <h1 className="text-4xl font-bold text-center">Search History</h1>
        <h3 className="text-xl font-bold text-center text-gray-400">
          (Most recent to oldest){" "}
        </h3>
        <ul className="divide-y divide-gray-700 w-11/12 md:w-4/5 mx-auto rounded-ee-lg">
          <li className="grid grid-cols-2 gap-4 h-14 items-center px-5 bg-neutral-950 rounded-t-lg">
            <div>
              <p>Searched</p>
            </div>
            <div className="flex justify-end ">
              <button className="" onClick={clearHistory}>
                Clear all history
              </button>
            </div>
          </li>
          {searchHistory
            .slice()
            .reverse()
            .map((search) => (
              <li
                key={search}
                onClick={() => {
                  handleHistoryClick(search);
                }}
                className="grid grid-cols-2 gap-4 h-14 items-center px-5 hover:bg-neutral-800"
              >
                <div>
                  <p>{search}</p>
                </div>
                <div className="flex justify-end ">
                  <button
                    className="text-red-500 "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(search);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M10 5h4a2 2 0 1 0-4 0M8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75m-7.516 9.467a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033L18.424 6.5H5.576z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
}
