import React, { useEffect, useState } from "react";
import { Howl, Howler } from "howler";
import spotify_logo from "../assets/images/spotify_logo.svg";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGetRequest } from "../components/utils/ServerHelpers";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [soundPlay, setSoundPlay] = useState(null);

  const playsound = (songSrc) => {
    if (soundPlay) {
      soundPlay.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlay(sound);

    sound.play();
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGetRequest("/api/song/mySong");
      setSongData(response.data);
    };
    getData();
  }, []);

  return (
    <div className="h-full w-full flex">
      {/*For side bar*/}
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
          <div className="logoDiv p-6">
            <img src={spotify_logo} alt="Logo" width={100} />
          </div>
          <div className="py-5">
            <IconText iconName={"material-symbols:home"} displayText="Home" />
            <IconText iconName={"iconamoon:search-bold"} displayText="Search" />
            <IconText
              iconName={"icomoon-free:books"}
              displayText="Your Library"
            />
            <IconText
              iconName={"material-symbols:library-music-sharp"}
              displayText="My Music"
              active
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
        <div className="content p-8 overflow-auto">
          <div className="text-white text-xl font-semibold pb-4 pl-2">
            My Songs
          </div>
          <div className=" space-y-3">
            {songData.map((item) => {
              return (
                <SingleSongCard
                  thumbnail={item.thumbnail}
                  artist={item.artist}
                  name={item.name}
                  track={item.track}
                  playsound={playsound}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMusic;
