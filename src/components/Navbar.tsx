import { Switch } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface Props {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar(props: Props) {
  const { darkMode, setDarkMode } = props;
  const [search, setSearch] = useState("");
  return (
    <>
      {/* Mobile Navbar */}
      <nav className="flex items-center justify-between p-4 lg:hidden">
        <p className="font-mono text-xl font-bold">Image Gallery</p>
        <div className="flex gap-3">
          <MagnifyingGlassIcon className="h-6 w-6" />
          <Bars3Icon className="h-6 w-6" />
        </div>
      </nav>
      {/* Desktop Navbar */}
      <nav className="hidden items-center justify-around py-4 px-8 lg:flex">
        <p className="font-mono text-xl font-bold">Image Gallery</p>
        <div className="flex items-center gap-5">
          <div className="flex justify-center">
            <div className="rounded-bl-md rounded-tl-md bg-[#ECECEC] py-2 px-2.5">
              <MagnifyingGlassIcon className="w-5 text-[#A7A7A7]" />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search high resolution Images"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-none bg-[#ECECEC] text-sm font-medium text-gray-500 placeholder:text-xs focus:outline-none xl:w-64"
            />
            <div className="rounded-br-md rounded-tr-md bg-[#ECECEC] py-1.5 px-2.5">
              {search.length ? (
                <XMarkIcon className="mt-[2px] w-5 text-[#A7A7A7]" />
              ) : (
                <div className="w-5"></div>
              )}
            </div>
          </div>
          <p className="text-sm font-semibold">Explore</p>
          <p className="text-sm font-semibold">Collection</p>
          <p className="text-sm font-semibold">Community</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">Dark mode</p>
          <div>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${
                darkMode ? "bg-black" : "bg-gray-200"
              } relative inline-flex h-5 w-8 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkMode ? "translate-x-4" : "translate-x-1"
                } inline-block h-3 w-3 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </nav>
    </>
  );
}
