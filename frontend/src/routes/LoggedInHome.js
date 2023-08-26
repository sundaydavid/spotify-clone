import React, { useState } from "react";
import spotify_logo from "../assets/images/spotify_logo.svg";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import TextWithHover from "../components/shared/TextWithHover";
import PlaylistView from "../components/utils/PlaylistView";
import { Link } from "react-router-dom";

const foucCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful paino pieces",
    imageUrl:
      "https://media.istockphoto.com/id/1491646990/photo/young-fashionable-woman-working-at-home.jpg?s=2048x2048&w=is&k=20&c=ksrDbSAf_4GKWOMtLQJvd-sHRl2qtO3e-DQsKKbSNAM=",
  },
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful paino pieces",
    imageUrl:
      "https://media.istockphoto.com/id/1491646990/photo/young-fashionable-woman-working-at-home.jpg?s=2048x2048&w=is&k=20&c=ksrDbSAf_4GKWOMtLQJvd-sHRl2qtO3e-DQsKKbSNAM=",
  },
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful paino pieces",
    imageUrl:
      "https://media.istockphoto.com/id/1491646990/photo/young-fashionable-woman-working-at-home.jpg?s=2048x2048&w=is&k=20&c=ksrDbSAf_4GKWOMtLQJvd-sHRl2qtO3e-DQsKKbSNAM=",
  },
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful paino pieces",
    imageUrl:
      "https://media.istockphoto.com/id/1491646990/photo/young-fashionable-woman-working-at-home.jpg?s=2048x2048&w=is&k=20&c=ksrDbSAf_4GKWOMtLQJvd-sHRl2qtO3e-DQsKKbSNAM=",
  },
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful paino pieces",
    imageUrl:
      "https://media.istockphoto.com/id/1491646990/photo/young-fashionable-woman-working-at-home.jpg?s=2048x2048&w=is&k=20&c=ksrDbSAf_4GKWOMtLQJvd-sHRl2qtO3e-DQsKKbSNAM=",
  },
];

const LoggedInHome = () => {
  const [soundPlay, setSoundPlay] = useState(null);
  const [isPause, setIsPause] = useState(true);

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

  const pauseSong = () => {
    soundPlay.pause();
  };

  const togglePlayPause = () => {
    if (isPause) {
      playsound(
        "https://res.cloudinary.com/dh3p0s6gc/video/upload/v1693002163/mtdbbktbmkdgbjsqvi3a.mp3"
      );
      setIsPause(false);
    } else {
      pauseSong();
      setIsPause(true);
    }
  };

  return (
    <div className="h-full w-full bg-app-black">
      <div className="w-full h-9/10 flex">
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
              <IconText
                iconName={"iconamoon:search-bold"}
                displayText="Search"
              />
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
                <Link to="/uploadSong">
                  <TextWithHover displayText="Upload Song" />
                </Link>
                <div className="bg-white h-10 w-10 rounded-full flex items-center justify-center font-semibold cursor-pointer">
                  AC
                </div>
              </div>
            </div>
          </div>
          <div className="content p-8 pt-0 overflow-auto">
            <PlaylistView titleText="Focus" cardsData={foucCardsData} />
            <PlaylistView
              titleText="Spotify Playlist"
              cardsData={foucCardsData}
            />
            <PlaylistView
              titleText="Sound of India"
              cardsData={foucCardsData}
            />
          </div>
        </div>
      </div>

      {/*This is the current playing song*/}
      <div className="w-full h-1/10 text-white bg-black bg-opacity-50 flex items-center p-4">
        <div className="w-1/4 flex items-center">
          <img
            src="https://i0.wp.com/xclusiveloaded.com/wp-content/uploads/2022/07/Chike-%E2%80%93-The-Brothers-Keeper-EP.jpg?fit=1024%2C1024&ssl=1"
            className="h-14 w-14"
          />
          <div>
            <div className="text-sm hover:underline cursor-pointer">
              E pain me Davido
            </div>
            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
              Davido
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center h-full flex-col items-center">
          <div className="flex w-1/3 justify-between items-center">
            {/*controls for the playing song goes here*/}
            <Icon
              icon="ph:shuffle-fill"
              fontSize={27}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
            <Icon
              icon="mdi:skip-previous-outline"
              classNa
              fontSize={27}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
            <Icon
              icon={
                isPause ? "carbon:play-filled" : "icon-park-solid:pause-one"
              }
              classNa
              fontSize={35}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={togglePlayPause}
            />
            <Icon
              icon="mdi:skip-next-outline"
              classNa
              fontSize={27}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
            <Icon
              icon="ic:baseline-repeat"
              fontSize={27}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
          </div>
          <div></div>
        </div>
        <div className="w-1/4 flex justify-end">Hello</div>
      </div>
    </div>
  );
};

export default LoggedInHome;
