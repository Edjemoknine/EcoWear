import { client } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Store",
  description: "Best Products for The Best Clients",
};
type Pro = {
  _id: string;
  name: string;
  Price: number;
  slug: string;
  imageUrl: string;
  categoryName: string;
};
const GetProducts = async () => {
  const query = `*[_type == 'product' ]
      {
        _id,
          name, 
          Price,
          "slug":Slug.current,
          "imageUrl":image[0].asset->url,
          "categoryName":category->name
         
      }`;
  const products = await client.fetch(query);
  return products;
};

const page = async () => {
  const products = await GetProducts();

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16  lg:max-w-6xl md:px-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome To Our Store
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-x-6 gap-y-10 xl:gap-x-8">
        {/* <div className=" grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-10 xl:gap-x-8"> */}
        {products?.map((product: Pro) => (
          <div key={product._id} className="group relative">
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
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default page;
