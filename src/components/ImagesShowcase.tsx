import { useState } from "react";
import ImageComponent from "./ImageComponent";
import ImageModal from "./ImageModal";

interface Props {
  images: any[];
  error: boolean;
  searchTerm: string;
  loading: boolean;
}
export default function ImagesShowcase(props: Props) {
  const { images, error, searchTerm, loading } = props;
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>(null);
  const handleImageClick = (image: any) => {
    setCurrentImage(image);
    setShowModal(true);
  };
  if (loading) {
    return (
      <p className="mx-auto flex h-screen w-[60vh] items-center justify-center text-xl font-semibold">
        Loading...
      </p>
    );
  }
  if (error) {
    return (
      <p className="mx-auto flex h-screen w-[60vh] items-center justify-center text-xl font-semibold">
        Something went wrong...
      </p>
    );
  }
  return (
    <div>
      {showModal && (
        <ImageModal setShowModal={setShowModal} currentImage={currentImage} />
      )}
      {showModal && (
        <div
          className="fixed top-0 left-0 z-10 h-full w-full bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        ></div>
      )}
      <div className="px-4 pt-3 md:px-6 lg:px-12 xl:mx-auto xl:w-[85%] xl:px-0 2xl:w-[80%]">
        <p className="pb-5 text-2xl font-semibold sm:pb-8 sm:text-3xl">
          {!!searchTerm?.length ? searchTerm : ""}
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
          {!!images?.length &&
            images.map((image) => (
              <div key={image.id} onClick={() => handleImageClick(image)}>
                <ImageComponent
                  imageUrl={image.urls.regular}
                  imageAlt={image.alt_description}
                  id={image.id}
                  likes={image.likes}
                  artistName={image.user?.name}
                  artistUsername={image.user?.username}
                  artistProfileImage={image.user?.profile_image?.small}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
