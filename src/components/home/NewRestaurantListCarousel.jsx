import React, { useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import SwiperSlideComponent from "../common/SwiperSlideComponent";
import carouselDummy from "../../json/carouselDummy.json";

const NewRestaurantListCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    register();
    setData(carouselDummy);
  }, []);

  return (
    <swiper-container
      className="carousel carousel--new-restaurant"
      slides-per-view={5}
      space-between={12}
    >
      {data.map(restaurant => (
        <SwiperSlideComponent
          key={restaurant.id}
          image={restaurant.image}
          title={restaurant.title}
          rating={restaurant.rating}
          reviews={restaurant.reviews}
        />
      ))}
    </swiper-container>
  );
};

export default NewRestaurantListCarousel;
