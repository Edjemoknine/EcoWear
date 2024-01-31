import { product, productDetail } from "@/Type/type";
import Gallery from "@/components/Gallery";
import Purchase from "@/components/Purchase";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity";
import { settings } from "@/lib/slideSettings";
import { Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const productDetails = async (slug: string) => {
  const query = `*[_type == 'product' && Slug.current == '${slug}'][0]

    {
      _id,
        name,
        description,
        Price,
        image,
        "slug":Slug.current,
        "categoryName":category->name
    }`;
  const product = await client.fetch(query);
  return product;
};

const GetSimilar = async (category: string) => {
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

// export async function generateMatadata({ params }) {
//   const product = await productDetails(params.slug);
//   console.log(product);
//   return { title: product.name, description: product.description };
// }

const Product = async ({ params }: { params: { slug: string } }) => {
  const product: productDetail = await productDetails(params.slug);
  const similar = await GetSimilar(product.categoryName);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl md:max-w-6xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Gallery image={product.image} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3 ">
              <span className="mb-0.5 inline-block text-gray-500">
                {product.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl ">
                {product.name}
              </h2>
            </div>
            <div className="flex items-center mb-6 gap-3 md:mb-10">
              <Button className=" gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>
              <span className="text-xs text-gray-500">56 Ratings</span>
            </div>
            <div className="mb-5">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${product.Price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${product.Price + 30}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm ">2-4 Day Shipping</span>
            </div>

            <Purchase product={product} />

            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {product.description}
            </p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-bold">Product You Might Also Like !</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 my-6 gap-6">
            {similar?.slice(0, 4).map((product: product) => (
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
                      <Link href={`/products/${product.slug}`}>
                        {product.slug}
                      </Link>
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
      </div>
    </div>
  );
};

export default Product;
