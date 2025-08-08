"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_LINKS } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
  user: User;
}

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href={ROUTES.HOME}
          className="flex gap-2 items-center mb-10 justify-center xl:justify-start"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Next Bank logo"
            className="size-[34px]"
          />
          <h1 className="sidebar-logo">Next</h1>
        </Link>
        {SIDEBAR_LINKS.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.name}
              className={cn("sidebar-link", { "bg-sky-500": isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className={cn({ "brightness-[3] invert-0 ": isActive })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.name}
              </p>
            </Link>
          );
        })}
        Plaid Link
      </nav>

      <SidebarFooter user={user} />
    </section>
  );
};

export default Sidebar;
