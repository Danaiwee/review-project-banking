"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";

import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";

import { Button } from "./ui/button";

interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost" | "default";
}

const PlaidLink = ({ user, variant = "primary" }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/");
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl text-gray-700 font-semibold">Connect Bank</h1>
        <p className="text-gray-500 text-sm font-semibold">
          Connect to your bank account
        </p>
        <Button
          className="plaidlink-primary bg-bank-gradient"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect Bank
        </Button>
      </div>
    </>
  );
};

export default PlaidLink;
