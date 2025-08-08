import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div className="relative w-full max-w-3xl h-[350px] mx-4 2xl:mx-0">
          <Image
            src="/icons/auth-image.png"
            fill
            className="rounded-xl object-center xl:object-cover border-4 border-gray-900 w-full h-full"
            alt="Auth image"
            priority
            sizes="center"
          />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
