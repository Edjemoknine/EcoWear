import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="px-4 mx-auto max-w-6xl w-full">
      <div className="bg-slate-200 relative flex p-6 rounded-md">
        <div className="flex flex-col flex-1 gap-3 justify-center">
          <p className="font-normal text-xs md:text-base">Best Offer</p>
          <h3 className="md:text-3xl text-xl font-semibold">Shoes</h3>
          <h1 className="font-bold text-white md:text-7xl sm:text-5xl text-3xl">
            FootWear
          </h1>
          <Link href="/store">
            <Button className="mt-3">Shop Now</Button>
          </Link>
        </div>
        <div className="relative flex-[2]">
          <Image
            src="/air force 1 jordan3.png"
            alt=""
            width={500}
            height={500}
          />
          <div className="text-right absolute right-6 bottom-3">
            <h3 className="font-semibold -mb-6 md:mb-0 text-primary text-lg mb-3 hidden sm:block">
              50% Off
            </h3>
            <p className="hidden md:flex text-gray-500 max-w-[250px]">
              The Best Products with amazing prices for the best client enjoy!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
