"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Menu, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const links = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/products" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
];
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const { setOpen } = useCart();

  useEffect(() => {
    setMobile(false);
  }, [pathname]);

  return (
    <header className="mb-8 border-b">
      <div className="flex justify-between items-center px-4 mx-auto max-w-2xl sm:px-6 lg:max-w-6xl">
        <Link href="/">
          <h1 className="md:text-4xl text-2xl font-bold ">
            Bra<span className="text-primary ">Wear</span>
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

        <div className="flex items-center ">
          <Button
            onClick={() => setOpen((prev) => !prev)}
            variant="link"
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 rounded-none md:w-24 md:h-24"
          >
            <ShoppingBag />
            {/* <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span> */}
          </Button>

          <div className="flex justify-center items-center ">
            {!isAuthenticated ? (
              <div className="">
                <Button className="w-full h-12 sm:h-20 md:h-24 rounded-none">
                  <LoginLink postLoginRedirectURL="/dashboard">
                    Sign in
                  </LoginLink>
                </Button>
              </div>
            ) : (
              <ProfileMenu user={user} />
            )}
          </div>
          <Menu
            className="flex cursor-pointer md:hidden ml-4"
            size={30}
            onClick={() => setMobile((prev) => !prev)}
          />
        </div>

        {/* Mobile Navbar */}
        <Sheet open={mobile} onOpenChange={setMobile}>
          <SheetContent className=" w-[300px] flex flex-col items-center gap-6 text-xl pt-16">
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
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
