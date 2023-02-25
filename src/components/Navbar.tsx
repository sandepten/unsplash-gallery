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
  setImages: React.Dispatch<React.SetStateAction<never[]>>;
  unsplash: any;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  fetchRandomImages: () => void;
}

export default function Navbar(props: Props) {
  const {
    darkMode,
    setDarkMode,
    setImages,
    unsplash,
    setError,
    setFirstSearch,
    setLoading,
    setSearchTerm,
    fetchRandomImages,
  } = props;
  const [search, setSearch] = useState("");
  const fetchImages = async (query: string) => {
    setLoading(true);
    setError(false);
    setFirstSearch(true);
    setSearchTerm(query);
    try {
      const data = await unsplash.search.getPhotos({
        query,
        perPage: 21,
      });
      setImages(data.response.results);
      console.log("data:", data.response);
    } catch (error) {
      console.log("error:", error);
      setError(true);
    }
    setLoading(false);
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      fetchImages(search);
    }
  };
  return (
    <>
      {/* Mobile Navbar */}
      <nav className="flex items-center justify-between p-4 dark:bg-gray-800 lg:hidden">
        <p
          className="font-mono text-xl font-bold dark:text-white"
          onClick={() => {
            setFirstSearch(false);
            fetchRandomImages();
          }}
        >
          Image Gallery
        </p>
        <div className="flex gap-3">
          <MagnifyingGlassIcon
            className="h-6 w-6 dark:text-white"
            onClick={() => fetchImages(search)}
          />
          <Bars3Icon className="h-6 w-6 dark:text-white" />
        </div>
      </nav>
      {/* Desktop Navbar */}
      <nav className="hidden items-center justify-around py-4 px-8 dark:bg-gray-800 lg:flex">
        <p
          className="cursor-pointer font-mono text-xl font-bold dark:text-white"
          onClick={() => {
            setFirstSearch(false);
            fetchRandomImages();
          }}
        >
          Image Gallery
        </p>
        <div className="flex items-center gap-5">
          <div className="flex justify-center">
            <div className="rounded-bl-md rounded-tl-md bg-[#ECECEC] py-2 px-2.5">
              <MagnifyingGlassIcon
                className="w-5 text-[#A7A7A7] dark:text-black"
                onClick={() => fetchImages(search)}
              />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search high resolution Images"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-none bg-[#ECECEC] text-sm font-medium text-gray-500 placeholder:text-xs focus:outline-none xl:w-64"
              onKeyDown={handleKeyDown}
            />
            <div className="rounded-br-md rounded-tr-md bg-[#ECECEC] py-1.5 px-2.5">
              {search.length ? (
                <XMarkIcon
                  className="mt-[2px] w-5 text-[#A7A7A7] dark:text-black"
                  onClick={() => setSearch("")}
                />
              ) : (
                <div className="w-5"></div>
              )}
            </div>
          </div>
          <p className="text-sm font-semibold dark:text-white">Explore</p>
          <p className="text-sm font-semibold dark:text-white">Collection</p>
          <p className="text-sm font-semibold dark:text-white">Community</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold dark:text-white">Dark mode</p>
          <div>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${
                darkMode ? "bg-gray-200" : "bg-gray-300"
              } relative inline-flex h-5 w-8 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkMode ? "translate-x-4" : "translate-x-1"
                } inline-block h-3 w-3 transform rounded-full bg-gray-500 transition`}
              />
            </Switch>
          </div>
        </div>
      </nav>
    </>
  );
}
