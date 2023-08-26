import React from "react";
import spotify_logo from "../assets/images/spotify_logo.svg";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import PlaylistView from "../components/utils/PlaylistView";

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

const HomeComponent = () => {
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
            <div className="w-3/5 flex justify-around items-center">
              <TextWithHover displayText="Premium" />
              <TextWithHover displayText="Support" />
              <TextWithHover displayText="Download" />
              <div className="h-1/2 border-r-2 border-white"></div>
            </div>
            {/* <div className="border-white border-r-2 h-2/5 mt-6 px-3 mr-3"></div> */}
            <div className="w-2/5 flex justify-around h-full items-center">
              <TextWithHover displayText="Sign up" />
              <div className="bg-white h-2/3 rounded-full flex px-8 items-center justify-center font-semibold cursor-pointer">
                Log in
              </div>
            </div>
          </div>
        </div>
        <div className="content p-8 pt-0 overflow-auto">
          <PlaylistView titleText="Focus" cardsData={foucCardsData}/>
          <PlaylistView titleText="Spotify Playlist" cardsData={foucCardsData}/>
          <PlaylistView titleText="Sound of India" cardsData={foucCardsData}/>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
