"use client"
import { properties } from "@/constants";
import { Carousel } from "@material-tailwind/react";

 
export function CarouselTransition() {
  return (
    <Carousel transition={{ duration: 2 }} autoplay={true} loop={true} className="rounded-xl h-[20rem] md:h-[40rem] rounded-none">
     {properties.map((item,index)=> <img key={index}
        src={item.imgUrl}
        alt={item.name}
     
        className="h-full w-full object-cover"
      />)}
     
    </Carousel>
  );
}