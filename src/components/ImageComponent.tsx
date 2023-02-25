import { HandThumbUpIcon } from "@heroicons/react/24/outline";

interface Props {
  imageUrl: string;
  imageAlt: string;
  id: string;
  likes: number;
  artistName: string;
  artistUsername: string;
  artistProfileImage: string;
}
export default function ImageComponent(props: Props) {
  const {
    imageUrl,
    imageAlt,
    id,
    likes,
    artistName,
    artistUsername,
    artistProfileImage,
  } = props;
  return (
    <div key={id}>
      <img
        src={imageUrl}
        alt={imageAlt}
        className="h-[10rem] w-full rounded-t-lg object-cover sm:h-[12rem] xl:h-[14rem]"
      />
      <div className="flex justify-between rounded-b-lg border border-gray-300 dark:border-black dark:bg-gray-900">
        <div className="flex w-3/4 items-center gap-2 px-2 py-1 sm:w-4/6 sm:p-2">
          <img
            src={artistProfileImage}
            alt={artistName}
            className="h-6 w-6 rounded-full sm:h-8 sm:w-8"
          />
          <div className="flex w-4/6 flex-col justify-between sm:w-full md:w-5/6">
            <p className="truncate text-[8px] font-semibold dark:text-white sm:text-xs">
              {artistName}
            </p>
            <p className="truncate text-[6px] text-[#A7A7A7] sm:text-[10px]">
              @{artistUsername}
            </p>
          </div>
        </div>
        <div className="flex w-2/6 items-center justify-center gap-1 sm:-mr-4 sm:w-2/6 md:-mr-2">
          <HandThumbUpIcon className="w-2 text-[#A7A7A7] sm:w-4" />
          <p className="text-[8px] text-[#A7A7A7] sm:text-xs">{likes}</p>
        </div>
      </div>
    </div>
  );
}
