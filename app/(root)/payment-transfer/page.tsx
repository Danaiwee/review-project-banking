import React from "react";

import HeaderBox from "@/components/HeaderBox";
import PaymentForm from "@/components/PaymentForm";
import { ACCOUNTS } from "@/constants";

const PaymentTransferPage = () => {
  

  return (
    <section className="payment-transfer no-scrollbar">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <div className="size-full pt-5">
        <PaymentForm accounts={ACCOUNTS} />
      </div>
    </section>
  );
};

export default PaymentTransferPage;
