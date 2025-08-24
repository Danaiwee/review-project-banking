import { Metadata } from "next";
import React from "react";

import AuthHeader from "@/components/AuthHeader";
import PlaidLink from "@/components/PlaidLink";
import SignUpForm from "@/components/SignupForm";
import { getLoggedInUser } from "@/lib/appwrite";

export const metadata: Metadata = {
  title: "Next Bank | Sign up",
  description:
    "Create your Next Bank account to start managing your finances securely and enjoy easy access to banking services tailored for you.",
};

const SignUpPage = async () => {
  const authUser = await getLoggedInUser();

  console.log("Log in user: ", authUser);
  return (
    <section className="flex-center size-full max-sm:px-6">
      <div className="auth-form">
        <AuthHeader />
        {authUser ? <PlaidLink user={authUser} /> : <SignUpForm />}
      </div>
    </section>
  );
};

export default SignUpPage;
