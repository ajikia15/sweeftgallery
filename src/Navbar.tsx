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
      <div className="flex items-center flex-shrink-0  mr-6">
        <span className="font-semibold text-xl tracking-tight">Gallery</span>
      </div>
      <div className="block">
        <NavLink
          to="/"
          className={`${(isActive: boolean) => {
            isActive ? "active" : "text-black";
          }}    block mt-4 lg:inline-block  lg:mt-0 transition-all  hover:text-black mr-4`}
        >
          Home
        </NavLink>
        <NavLink
          to="/history"
          className={`${(isActive: boolean) => {
            isActive ? "active" : "text-black";
          }}    block mt-4 lg:inline-block  lg:mt-0 transition-all  hover:text-black mr-4`}
        >
          History
        </NavLink>
      </div>
      <div className="block">
        <div className="flex items-center relative">
          <input
            className={`${
              isHistoryPage ? "opacity-70" : ""
            } bg-white focus:outline-none  transition-all focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal`}
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
