import "./App.css";
import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import HomeComponent from "./routes/Home";
import { useCookies } from "react-cookie";
import LoggedInHome from "./routes/LoggedInHome";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import SongContext from "./contexts/songContexts";
import { useState } from "react";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          <SongContext.Provider value={{ currentSong, setCurrentSong }}>
            <Routes>
              <Route path="/" element={<HelloComponent />} />
              <Route path="/home" element={<LoggedInHome />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </SongContext.Provider>
        ) : (
          <Routes>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

const HelloComponent = () => {
  return <div>This is hello from component</div>;
};

export default App;
