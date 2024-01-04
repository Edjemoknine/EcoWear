"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
];
const Navbar = () => {
  const pathname = usePathname();
  const { setOpen } = useCart();
  return (
    <header className="mb-8 border-b">
      <div className="flex justify-between items-center px-4 mx-auto max-w-2xl sm:px-6 lg:max-w-6xl">
        <Link href="/">
          <h1 className="md:text-4xl text-2xl font-bold ">
            Eco<span className="text-primary ">merce</span>
          </h1>
        </Link>
        <nav className="md:flex 2xl:ml-16 space-x-12 hidden">
          {links.map((link) => (
            <Link
              className={`${
                pathname === link.href && "text-primary font-bold"
              } hover:text-primary`}
              href={link.href}
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex border-r sm:border-l"
        >
          <Button
            variant="outline"
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 rounded-none md:w-24 md:h-24"
          >
            <ShoppingBag />
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
