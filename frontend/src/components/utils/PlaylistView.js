import React from "react";

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {cardsData.map((item) => {
          return <Card title={item.title} description={item.description} imageUrl={item.imageUrl}/>;
        })}
      
      </div>
    </div>
  );
};

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-black bg-opacity-50 p-4 rounded-lg">
      <div className="pb-4 pt-2 mt-8">
        <img className="w-full rounded-md" src={imageUrl} alt="Test" />
      </div>
      <div className="text-white text font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default PlaylistView;
