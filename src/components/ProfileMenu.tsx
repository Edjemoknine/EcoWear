import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Button } from "./ui/button";

const ProfileMenu = ({ user }: { user: any }) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          {user?.picture ? (
            <Image
              width={35}
              height={35}
              alt="avatar"
              className="rounded-full"
              src={user?.picture}
            />
          ) : (
            <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center">
              {user?.given_name?.[0]}
              {user?.family_name?.[0]}{" "}
            </div>
          )}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="text-center">{user?.given_name}</MenubarItem>
          <MenubarItem>{user?.family_name}</MenubarItem>

          <MenubarSeparator />
          <MenubarItem>
            <Button className="w-full" variant={"default"}>
              <LogoutLink>Log out</LogoutLink>
            </Button>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ProfileMenu;
