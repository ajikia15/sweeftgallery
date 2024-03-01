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
    if (debouncedSearch && !searchHistory.includes(debouncedSearch)) {
      setSearchHistory((prevSearchHistory) => [
        ...prevSearchHistory,
        debouncedSearch,
      ]);
    }
  }, [debouncedSearch]);

  return (
    <SearchContext.Provider
      value={{ search, setSearch, debouncedSearch, searchHistory }}
    >
      <Navbar />
      <Outlet />
    </SearchContext.Provider>
  );
}
