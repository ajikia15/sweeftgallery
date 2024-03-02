import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { SearchContext } from "../context";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export default function Root() {
  const [search, setSearch] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    const savedSearchHistory = localStorage.getItem("searchHistory");
    if (savedSearchHistory) {
      setSearchHistory(JSON.parse(savedSearchHistory));
    }
  }, []);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch !== " ") {
      if (searchHistory.includes(debouncedSearch)) {
        // if duplicate, remove and add to the end
        setSearchHistory(
          searchHistory.filter((item) => item !== debouncedSearch)
        );
        setSearchHistory((prevSearchHistory) => [
          ...prevSearchHistory,
          debouncedSearch,
        ]);
      } else {
        setSearchHistory((prevSearchHistory) => {
          const updatedSearchHistory = [...prevSearchHistory, debouncedSearch];

          localStorage.setItem(
            "searchHistory",
            JSON.stringify(updatedSearchHistory)
          );

          return updatedSearchHistory;
        });
      }
    }
  }, [debouncedSearch]);

  function deleteHistoryItem(search: string) {
    setSearchHistory((prevSearchHistory) =>
      prevSearchHistory.filter((item) => item !== search)
    );
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(searchHistory.filter((item) => item !== search))
    );
  }
  function clearHistory() {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  }
  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        debouncedSearch,
        deleteHistoryItem,
        searchHistory,
        clearHistory,
      }}
    >
      <Navbar />
      <Outlet />
    </SearchContext.Provider>
  );
}
