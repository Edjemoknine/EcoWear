import { client } from "@/lib/sanity";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { product } from "@/Type/type";

const GetProByCategory = async (category: string) => {
  const query = `*[_type == 'product' && category->name == '${category}']

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

const Category = async ({ params }: { params: { category: string } }) => {
  const products: product[] = await GetProByCategory(params.category);

  return (
    <div className="mx-auto max-w-2xl px-4  lg:max-w-6xl md:px-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Products for {params.category}
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-x-6 gap-y-10 xl:gap-x-8">
        {products?.map((product) => (
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
      </div>
    </div>
  );
};

export default Category;
