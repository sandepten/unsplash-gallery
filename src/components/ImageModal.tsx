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
    <div className="fixed left-1/2 top-1/2 z-20 w-[90%] -translate-x-1/2 -translate-y-1/2">
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="rounded-t-xl"
      />
      <XCircleIcon
        className="absolute -top-2 -right-2 h-7 w-7 cursor-pointer text-white"
        onClick={() => setShowModal(false)}
      />
      <div>
        <div className="rounded-b-xl bg-white px-4 py-2">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-1/2 items-center gap-2">
              <img
                src={image.user?.profile_image?.small}
                alt={image.user?.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="w-1/2">
                <p className="truncate text-xs font-semibold">
                  {image.user?.name}
                </p>
                <p className="truncate text-[10px] text-gray-500">
                  @{image.user?.username}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                window.open(image.links.download, "_blank");
              }}
              className="w-1/2 rounded-md bg-green-600 px-4 py-2.5 text-[10px] font-medium text-white"
            >
              Download Image
            </button>
          </div>
          <div className="my-2 flex items-center justify-between">
            <div className="flex w-1/2 gap-2">
              {image.user.social?.instagram_username && (
                <a
                  href={`https://www.instagram.com/${image.user.social.instagram_username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="truncate text-[10px] text-gray-500">
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
                  <p className="truncate text-[10px] text-gray-500">
                    @{image.user.social.twitter_username}
                  </p>
                </a>
              )}
            </div>
            <div className="flex w-1/2 justify-center gap-2">
              <p className="text-[10px] text-gray-500">
                {image.downloads} downloads
              </p>
              <div className="flex items-center gap-1">
                <HandThumbUpIcon className="h-3 w-3 text-gray-500" />
                <p className="text-[10px] text-gray-500">{image.likes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
