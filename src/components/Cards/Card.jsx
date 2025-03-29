import React from "react";
import { memo } from "react";
import { GiPolarStar } from "react-icons/gi";
const Cards = () => {
  const cardData = {
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/7/17/216703ed-400f-4e98-92ef-464376c45acf_641508.jpg",
    title: "Pizza Hut",
    rating: "4.4 • 40-45 mins",
    description: "Pizzas • Ottapalam",
  };

  const cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(
      <div
        key={i}
        className="bg-white shadow-md rounded-lg cursor-pointer transition-all duration-200"
      >
        <img
          className="w-full h-40 object-cover rounded-t-lg"
          src={cardData.image}
          alt={cardData.title}
        />
        <div className="p-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {cardData.title}
          </h3>
          <div className="text-sm text-gray-700 mt-1 flex items-center gap-1">
            <GiPolarStar className="text-yellow-400" />
            {cardData.rating}
          </div>

          <div className="text-sm text-gray-600 mt-1">
            {cardData.description}
          </div>
        </div>
      </div>
    );
  }

  return (
<div className="px-4 sm:px-6 lg:px-32">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {cards}
      </div>
    </div>
  );
};

export default memo(Cards);
