import { useState } from "react";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <main className="font-sans">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Banner />
    </main>
  );
}

export default App;
