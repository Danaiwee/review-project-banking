import AuthHeader from "@/components/AuthHeader";
import PlaidLink from "@/components/PlaidLink";
import SignInForm from "@/components/SignInForm";
import { getLoggedInUser } from "@/lib/appwrite";

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
