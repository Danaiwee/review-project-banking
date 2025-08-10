import React from "react";

import AuthHeader from "@/components/AuthHeader";
import SignUpForm from "@/components/SignupForm";
import { getLoggedInUser } from "@/lib/appwrite";

const SignUpPage = async () => {
  const authUser = await getLoggedInUser();

  console.log("Log in user: ", authUser);
  return (
    <section className="flex-center size-full max-sm:px-6">
      <div className="auth-form">
        <AuthHeader />

        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUpPage;
