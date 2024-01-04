import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

const getBanner = async () => {
  const query = "*[_type == 'Hero'][0]";

  const result = await client.fetch(query);
  return result;
};

const Hero = async () => {
  const banner = await getBanner();
  // console.log(banner.image1.asset._ref);
  return (
    <section className="mx-auto max-w-2xl sm:pb-6 px-4 lg:max-w-6xl lg:px-8">
      <div className="mb-8  flex flex-wrap justify-between md:mb-16">
        <div className="mb-6  flex w-full flex-col justify-center sm:mb-12 md:mb-0 lg:w-1/3 lg:pt-40">
          <h1 className="mb-4 text-black text-4xl font-bold sm:text-4xl md:text-6xl md:mb-8 ">
            {banner.Title}
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            {banner.description}
          </p>
        </div>
        <div className="mb-12 flex w-full md:mb-16  md:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src={urlFor(banner.image1).url()}
              width={500}
              height={500}
              className="w-full h-full object-cover object-center"
              alt="banner"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              src={urlFor(banner.image2).url()}
              width={500}
              height={500}
              priority
              className="w-full h-full object-cover object-center"
              alt="banner"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          <Link
            href="/men"
            className="flex w-1/3 items-center justify-center text-gray-500 duration-300 hover:bg-gray-100 active:bg-gray-200"
          >
            Men
          </Link>

          <Link
            href="/women"
            className="flex w-1/3 items-center justify-center text-gray-500 duration-300 hover:bg-gray-100 active:bg-gray-200"
          >
            Women
          </Link>

          <Link
            href="/teens"
            className="flex w-1/3 items-center justify-center text-gray-500 duration-300 hover:bg-gray-100 active:bg-gray-200"
          >
            Teens
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
