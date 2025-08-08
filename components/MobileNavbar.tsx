"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

import SidebarFooter from "./SidebarFooter";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface MobileNavbarProps {
  user: User;
}

const MobileNavbar = ({ user }: MobileNavbarProps) => {
  const pathname = usePathname();

  return (
    <section className="w-fulll min-w-[200px] max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <SheetTitle asChild>
            <Link
              href="/"
              className="cursor-pointer flex items-center gap-1 px-4 mt-3 mx-2"
            >
              <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Horizon logo"
              />
              <h1 className="text-3xl font-ibm-plex-serif font-bold text-black-1">
                Next
              </h1>
            </Link>
          </SheetTitle>
          <div className="mobilenav-sheet">
            <SheetDescription asChild>
              <nav className="flex h-full flex-col gap-3 pt-16 text-white mx-5">
                {SIDEBAR_LINKS.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.name}
                        className={cn("mobilenav-sheet_close w-full", {
                          "bg-sky-500": isActive,
                        })}
                      >
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />
                        <p
                          className={cn(
                            "text-[16px] font-semibold text-gray-900",
                            {
                              "text-white": isActive,
                            }
                          )}
                        >
                          {item.name}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                USER
              </nav>
            </SheetDescription>

            <div className="mx-5">
              <SidebarFooter user={user} type="mobile" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
