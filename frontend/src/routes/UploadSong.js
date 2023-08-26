import React, { useState } from "react";
import spotify_logo from "../assets/images/spotify_logo.svg";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { makeAuthenticatedPostRequest } from "../components/utils/ServerHelpers";
import { useNavigate } from "react-router-dom";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFilename, setUploadedSongFilename] = useState();
  const navigate = useNavigate();

  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl };

    const response = await makeAuthenticatedPostRequest(
      "/api/song/create",
      data
    );
    if (response.message) {
      alert("Error " + response.message);
      return;
    }
    alert("Song added succesfully");
    navigate("/home");
  };

  return (
    <div className="h-full w-full flex">
      {/*For side bar*/}
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
          <div className="logoDiv p-6">
            <img src={spotify_logo} alt="Logo" width={100} />
          </div>
          <div className="py-5">
            <IconText
              iconName={"material-symbols:home"}
              displayText="Home"
              active
            />
            <IconText iconName={"iconamoon:search-bold"} displayText="Search" />
            <IconText
              iconName={"icomoon-free:books"}
              displayText="Your Library"
            />
            <IconText
              iconName={"material-symbols:library-music-sharp"}
              displayText="My Music"
            />
          </div>
          <div className="pt-5">
            <IconText
              iconName={"material-symbols:add-box"}
              displayText="Create Playlist"
            />
            <IconText iconName={"mdi:heart-box"} displayText="Liked Songs" />
          </div>
        </div>
        <div className="px-5">
          <div className="border border-gray-400 text-white w-1/2 flex items-center justify-between rounded-full px-1 pr-2 hover:border-white cursor-pointer">
            <Icon icon="mingcute:earth-line" color="white" fontSize={20} />
            <div className="font-semibold">English</div>
          </div>
        </div>
      </div>
      {/*For the main listing*/}
      <div className="h-full w-4/5 bg-app-black overflow-auto">
        <div className="navBar w-full h-1/10 bg-black bg-opacity-50 flex items-center justify-end">
          <div className="w-1/2 flex h-full">
            <div className="w-2/3 flex justify-around items-center">
              <TextWithHover displayText="Premium" />
              <TextWithHover displayText="Support" />
              <TextWithHover displayText="Download" />
              <div className="h-1/2 border-r-2 border-white"></div>
            </div>
            {/* <div className="border-white border-r-2 h-2/5 mt-6 px-3 mr-3"></div> */}
            <div className="w-1/3 flex justify-around h-full items-center">
              <TextWithHover displayText="Upload Song" />
              <div className="bg-white h-10 w-10 rounded-full flex items-center justify-center font-semibold cursor-pointer">
                AC
              </div>
            </div>
          </div>
        </div>
        <div className="content p-8 pt-0 overflow-auto">
          <div className="text-xl font-semibold mt-5 mb-5 text-white">
            Upload Your Songs
          </div>
          <div className="w-2/3 flex space-x-3">
            <div className="w-1/2">
              <TextInput
                label="Name"
                labelClassName="text-white"
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                label="Thumbnail"
                labelClassName="text-white"
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>
          {/* <TextInput /> */}
          <div className="py-5">
            {uploadedSongFilename ? (
              <div className="bg-white rounded-full p-3 w-1/3">
                {uploadedSongFilename.substring(0, 35)}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFilename}
              />
            )}
          </div>

          <div
            className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
            onClick={submitSong}
          >
            Submit Song
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSong;
