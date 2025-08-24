import { Metadata } from "next";

import AuthHeader from "@/components/AuthHeader";
import PlaidLink from "@/components/PlaidLink";
import SignInForm from "@/components/SignInForm";
import { getLoggedInUser } from "@/lib/appwrite";

export const metadata: Metadata = {
  title: "Next Bank | Sign in",
  description:
    "Securely sign in to your Next Bank account to manage your finances, view transactions, and access personalized banking services.",
};

const SignInPage = async () => {
  const authUser = await getLoggedInUser();

  return (
    <section className="flex-center size-full max-sm:px-6">
      <div className="auth-form">
        <AuthHeader />

        {authUser ? <PlaidLink user={authUser} /> : <SignInForm />}
      </div>
    </section>
  );
};

export default SignInPage;
