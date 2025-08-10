"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { logOut } from "@/lib/actions/user.actions";

interface SidebarFooterProps {
  user: User;
  type?: "desktop" | "mobile";
}

const SidebarFooter = ({ user, type = "desktop" }: SidebarFooterProps) => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const { firstName, lastName } = user;

  const handleLogout = async () => {
    setisLoading(true);
    try {
      const response = await logOut();
      if (response) router.push("/sign-in");
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div
        className={type === "desktop" ? "footer-name" : "footer-name_mobile"}
      >
        <p className="text-xl font-bold text-gray-700">{firstName[0]}</p>
      </div>

      <div
        className={type === "desktop" ? "footer-email" : "footer-email_mobile"}
      >
        <h1 className="text-gray-900 text-sm font-semibold">
          {`${firstName} ${lastName}`}
        </h1>
        <p className="text-xs font-normal text-gray-500">{user?.email}</p>
      </div>

      <div className="footer-image" onClick={handleLogout}>
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Image src="icons/logout.svg" fill alt="jsm" />
        )}
      </div>
    </footer>
  );
};

export default SidebarFooter;
