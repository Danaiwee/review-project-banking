import React from "react";

import AuthHeader from "@/components/AuthHeader";
import SignInForm from "@/components/SignInForm";

const SignInPage = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <div className="auth-form">
        <AuthHeader />

        <SignInForm />
      </div>
    </section>
  );
};

export default SignInPage;
