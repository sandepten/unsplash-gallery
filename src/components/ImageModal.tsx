import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentImage: any;
}

export default function ImageModal(props: Props) {
  const { setShowModal, currentImage } = props;
  const image = currentImage;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed left-1/2 top-1/2 z-20 w-[90%] -translate-x-1/2 -translate-y-1/2 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5">
      <div className="relative">
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className="max-h-[30rem] w-full rounded-t-xl object-cover"
        />
        <button
          onClick={() => {
            window.open(image.links.download, "_blank");
          }}
          className="absolute bottom-2.5 right-2.5 rounded-md bg-green-600 px-4 py-2 text-[10px] font-medium text-white"
        >
          Download Image
        </button>
      </div>
      <XCircleIcon
        className="absolute -top-2 -right-2 h-7 w-7 cursor-pointer text-white"
        onClick={() => setShowModal(false)}
      />
      <div>
        <div className="rounded-b-xl bg-white px-4 py-2 dark:bg-gray-800 lg:py-4">
          <div className="lg:flex lg:items-center">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-1/2 items-center gap-2 lg:w-full">
                <img
                  src={image.user?.profile_image?.small}
                  alt={image.user?.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="w-1/2">
                  <p className="truncate text-xs font-semibold dark:text-white">
                    {image.user?.name}
                  </p>
                  <p className="truncate text-[10px] text-gray-500 dark:text-[#A7A7A7]">
                    @{image.user?.username}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  window.open(image.links.download, "_blank");
                }}
                className="w-1/2 rounded-md bg-green-600 px-4 py-2.5 text-[10px] font-medium text-white lg:hidden lg:w-auto"
              >
                Download Image
              </button>
            </div>
            <div className="my-2 flex items-center justify-between lg:w-full">
              <div className="flex w-1/2 gap-2 lg:w-auto">
                {image.user.social?.instagram_username && (
                  <a
                    href={`https://www.instagram.com/${image.user.social.instagram_username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="truncate text-[10px] text-gray-500 dark:text-[#A7A7A7] lg:text-xs">
                      @{image.user.social.instagram_username}
                    </p>
                  </a>
                )}
                {image.user.social?.twitter_username && (
                  <a
                    href={`https://www.twitter.com/${image.user.social.twitter_username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="truncate text-[10px] text-gray-500 dark:text-[#A7A7A7] lg:text-xs">
                      @{image.user.social.twitter_username}
                    </p>
                  </a>
                )}
              </div>
              <div className="flex w-1/2 justify-center gap-2 lg:w-auto">
                <p className="text-[10px] text-gray-500 dark:text-[#A7A7A7] lg:text-xs">
                  {image.downloads} downloads
                </p>
                <div className="flex items-center gap-1">
                  <HandThumbUpIcon className="h-3 w-3 text-gray-500 dark:text-[#A7A7A7] lg:h-4 lg:w-4" />
                  <p className="text-[10px] font-medium text-gray-500 lg:text-xs">
                    {image.likes}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:py-2">
            {!!image?.tags?.length && (
              <p className="pb-1 text-[10px] font-semibold">Related Tags</p>
            )}
            {image?.tags?.map((tag: { title: string; type: string }) => (
              <span className="mr-2 bg-gray-200 px-2 py-1 text-[10px]">
                {tag.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
