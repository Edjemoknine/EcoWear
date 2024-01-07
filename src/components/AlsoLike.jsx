import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const AlsoLike = ({ similar }) => {
  return (
    <Swiper spaceBetween={50} slidesPerView={3}>
      {similar?.map((product) => (
        <SwiperSlide key={product._id} className="group relative">
          <div className="aspect-square flex justify-center items-center w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
            <Image
              src={product.imageUrl}
              alt="product"
              width={300}
              height={300}
              className=" object-cover object-center"
            />
          </div>
          <div className="flex justify-between my-4">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link href={`/products/${product.slug}`}>{product.slug}</Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {product.categoryName}
              </p>
            </div>
            <p className="text-sm text-gray-900 font-medium">
              ${product.Price}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AlsoLike;
