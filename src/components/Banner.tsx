import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import backgroundPic from "../assets/background-pic.png";

interface Props {
  setImages: React.Dispatch<React.SetStateAction<never[]>>;
  unsplash: any;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function Banner(props: Props) {
  const {
    setImages,
    unsplash,
    setError,
    setFirstSearch,
    setLoading,
    setSearchTerm,
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
        perPage: 20,
      });
      setImages(data.response.results);
      console.log("data:", data);
    } catch (error) {
      console.log("error:", error);
      setError(true);
    }
    setLoading(false);
  };
  return (
    <div className="relative">
      <img
        src={backgroundPic}
        alt="Backdrop mountains"
        className="absolute -z-10 h-[38vh] w-screen object-cover sm:h-[20rem]"
      />
      <div className="h-[38vh] items-center justify-center sm:flex sm:h-[20rem] sm:flex-col">
        <div className="pt-12 text-center sm:pt-0">
          <p className="mx-auto w-[80%] text-2xl font-semibold text-white sm:w-full md:text-3xl">
            Download High Quality Images by creators
          </p>
          <p className="mx-auto mt-2 w-4/6 text-[10px] font-medium text-[#C4C4C4] md:mt-4 md:w-full md:text-xs">
            Over 2.4 million+ stock Images by our talented community
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="rounded-bl-md rounded-tl-md bg-white py-2 px-2.5 lg:py-3 lg:px-4">
            <MagnifyingGlassIcon
              className="w-5"
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
            className="border-none bg-white text-base font-medium text-gray-500 placeholder:text-xs focus:outline-none sm:w-full md:w-72 lg:w-96"
          />
          <div className="rounded-br-md rounded-tr-md bg-white py-1.5 px-2.5 lg:py-3 lg:px-4">
            {search.length ? (
              <XMarkIcon className="mt-[2px] w-5" />
            ) : (
              <div className="w-5"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
