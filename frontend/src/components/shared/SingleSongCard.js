import React from "react";

const SingleSongCard = ({ thumbnail, track, artist, name, playsound }) => {
  return (
    <div
      className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
      onClick={() => {
        playsound(track);
      }}
    >
      <div
        className="w-12 h-12 bg-cover bg-center"
        style={{
          backgroundImage: `url("${thumbnail}")`,
        }}
      ></div>
      <div className="flex w-full">
        <div className="text-white flex w-5/6 justify-between items-start flex-col pl-4">
          <div className="cursor-pointer hover:underline">{name}</div>
          <div className="text-xs text-gray-400 cursor-pointer hover:underline">
            {artist}
          </div>
        </div>
        <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
          <div>3:40</div>
          {/* <div className=" text-gray-400 flex items-center justify-center pl-3 text-lg">...</div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
