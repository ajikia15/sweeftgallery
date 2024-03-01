import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SearchContext } from "./context";
import { useRef } from "react";
import { Tooltip } from "./reusable/Tooltip";
const Navbar = () => {
  const { search, setSearch } = useContext(SearchContext);
  const location = useLocation();
  const isHistoryPage = location.pathname === "/history";
  const inputRef = useRef(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <nav className="flex items-center justify-between p-6">
      <div className="flex items-center justify-between gap-x-5">
        <span className="font-semibold text-2xl tracking-tight bg-gradient-to-r from-violet-700 via-pink-600 to-amber-400 bg-clip-text text-transparent">
          SweeftGallery
        </span>
        <NavLink
          to="/"
          className={`${(isActive: boolean) => {
            isActive ? "active" : "text-gray-500";
          }} transition-all font-bold text-xl text-gray-500`}
        >
          Home
        </NavLink>
        <NavLink
          to="/history"
          className={`${(isActive: boolean) => {
            isActive ? "active" : "text-gray-400";
          }} transition-all text-gray-500 hover:text-purple font-bold text-xl`}
        >
          History
        </NavLink>
      </div>

      <div className="block">
        <div className="flex items-center relative">
          <input
            className={`${
              isHistoryPage ? "opacity-70" : ""
            } bg-neutral-800 w-full text-gray-400 focus:outline-none pl-10  transition-all focus:shadow-outline border border-0 rounded-lg py-2 px-4 block appearance-none leading-normal`}
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleInputChange}
            disabled={isHistoryPage}
            ref={inputRef}
          />

          {isHistoryPage && (
            <Tooltip
              hoverRef={inputRef}
              tooltipText="Only on the home page"
            ></Tooltip>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-gray-400 absolute left-2"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
            ></path>
          </svg>
          {/* <div className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current text-gray-500 "
            >
              <g fill="none">
                <path d="M0 0h24v24H0z" className=""></path>
                <path
                  fill="currentColor"
                  d="M10.5 2a8.5 8.5 0 0 1 6.676 13.762l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 1 1 10.5 2m0 2a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13m0 1a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11"
                ></path>
              </g>
            </svg>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
