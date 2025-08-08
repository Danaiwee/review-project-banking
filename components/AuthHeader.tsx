import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthHeader = () => {
  return (
    <Link href="/" className="cursor-pointer flex items-center gap-1">
      <Image
        src="/icons/logo.svg"
        width={34}
        height={34}
        alt="Next Bank logo"
      />
      <h1 className="text-[30px] font-ibm-plex-serif font-bold text-black-1">
        Next
      </h1>
    </Link>
  );
};

export default AuthHeader;
