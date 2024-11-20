import React from 'react';
import Slider from "react-slick";
import mainImg from '../../assets/slider-image-3.jpeg';
import mainImg2 from '../../assets/slider-image-2.jpeg';
import mainImg3 from '../../assets/slider-image-1.jpeg';
import panner from '../../assets/grocery-banner-2.jpeg';
import slider2 from '../../assets/slider-2.jpeg';

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="lg:w-3/4 w-full">
          <Slider {...settings}>
            <div>
              <img className="w-full h-64 lg:h-[400px] object-cover" src={mainImg} alt="slider image 1" />
            </div>
            <div>
              <img className="w-full h-64 lg:h-[400px] object-cover" src={panner} alt="slider image 2" />
            </div>
            <div>
              <img className="w-full h-64 lg:h-[400px] object-cover" src={slider2} alt="slider image 3" />
            </div>
          </Slider>
        </div>
        <div className="lg:w-1/4 w-full flex flex-col space-y-4 mt-4 lg:mt-0">
          <div>
            <img className="w-full h-32 lg:h-[200px] object-cover" src={mainImg2} alt="side image 1" />
          </div>
          <div>
            <img className="w-full h-32 lg:h-[200px] object-cover" src={mainImg3} alt="side image 2" />
          </div>
        </div>
      </div>
    </>
  );
}
