import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import Banner from "./components/Banner";
import ImagesShowcase from "./components/ImagesShowcase";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const unsplash = createApi({
    accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  });
  const [firstSearch, setFirstSearch] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchRandomImages = async () => {
    setLoading(true);
    setError(false);
    setSearchTerm("");
    try {
      const data: any = await unsplash.photos.getRandom({
        count: 21,
      });
      setImages(data.response);
      console.log("data:", data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
  const handleDarkMode = () => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    handleDarkMode();
  }, [darkMode]);
  useEffect(() => {
    fetchRandomImages();
    const darkLocalStorage = localStorage.getItem("darkMode");
    if (darkLocalStorage) {
      setDarkMode(JSON.parse(darkLocalStorage));
    }
  }, []);
  return (
    <main className="pb-[5vh] font-sans dark:bg-gray-800">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setImages={setImages}
        unsplash={unsplash}
        setFirstSearch={setFirstSearch}
        setError={setError}
        setLoading={setLoading}
        setSearchTerm={setSearchTerm}
        fetchRandomImages={fetchRandomImages}
      />
      {!firstSearch && (
        <Banner
          setImages={setImages}
          unsplash={unsplash}
          setFirstSearch={setFirstSearch}
          setError={setError}
          setLoading={setLoading}
          setSearchTerm={setSearchTerm}
        />
      )}
      <ImagesShowcase
        images={images}
        error={error}
        searchTerm={searchTerm}
        loading={loading}
      />
    </main>
  );
}

export default App;
