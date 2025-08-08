import Image from "next/image";
import React from "react";

import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import { AUTHUSER } from "@/constants";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const authUser = AUTHUSER;

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
