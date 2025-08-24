import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

import HeaderBox from "@/components/HeaderBox";
import PaymentForm from "@/components/PaymentForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/appwrite";

export const metadata: Metadata = {
  title: "Next Bank | Transfer fund",
  description:
    "Make fast and secure payment transfers with Next Bank. Send money easily to your contacts or other accounts anytime, anywhere.",
};

const PaymentTransferPage = async () => {
  const authUser = await getLoggedInUser();
  if (!authUser) redirect("/sign-in");

  const accounts = await getAccounts({ userId: authUser.$id });
  if (!accounts) redirect("/sign-in");

  const accountsData = accounts?.data;

  return (
    <section className="payment-transfer no-scrollbar">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <div className="size-full pt-5">
        <PaymentForm accounts={accountsData} />
      </div>
    </section>
  );
};

export default PaymentTransferPage;
