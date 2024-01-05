"use client";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { useState } from "react";
const Gallery = ({ image }: any) => {
  // console.log(image);
  const [Bimage, setBimage] = useState(image[0]);
  return (
    <div className="grid lg:grid-cols-5 gap-4 ">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {image.map((ima: any, i: any) => (
          <div key={i} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              onClick={() => setBimage(image[i])}
              src={urlFor(ima).url()}
              alt="image"
              width={200}
              height={200}
              className="w-full h-full object-cover object-center cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="lg:col-span-4 overflow-hidden relative rounded-lg bg-gray-100 ">
        <Image
          src={urlFor(Bimage).url()}
          alt="MainImage"
          width={400}
          height={499}
          className="w-full h-full object-cover object-center"
        />
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 tracking-wider uppercase px-3 py-1.5 text-white text-sm">
          Sale
        </span>
      </div>
    </div>
  );
};

export default Gallery;
