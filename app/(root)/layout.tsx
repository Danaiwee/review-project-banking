import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/appwrite";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const authUser = await getLoggedInUser();
  if (!authUser) redirect("/sign-in");

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={authUser} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNavbar user={authUser} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default RootLayout;
