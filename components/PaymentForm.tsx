"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { getBank, getBankByAccountId } from "@/lib/actions/bank.actions";
import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTranaction } from "@/lib/actions/transaction.actions";
import { decryptId } from "@/lib/utils";
import { PaymentSchema } from "@/lib/validations";

import BankDropdown from "./BankDropdown";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface PaymentFormProps {
  accounts: Account[];
}

const PaymentForm = ({ accounts }: PaymentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      email: "",
      note: "",
      amount: "",
      senderBank: "",
      shareableId: "",
    },
  });

  const submit = async (data: z.infer<typeof PaymentSchema>) => {
    setIsLoading(true);
    try {
      const { note, senderBank, shareableId, email, amount } = data;

      const receiverAccountId = decryptId(shareableId);
      const receiverBankData = await getBankByAccountId({
        accountId: receiverAccountId,
      });

      const senderBankData = await getBank({ appwriteItemId: senderBank });

      //Create transfer in dwolla
      const dwollaTransferParams = {
        sourceFundingSourceUrl: senderBankData.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBankData.fundingSourceUrl,
        amount,
      };
      const transfer = await createTransfer(dwollaTransferParams);

      //If transfer in dwolla sucess, create transation in database
      if (transfer) {
        const transaction = {
          note,
          amount,
          senderId: senderBankData.userId.$id,
          receiverId: receiverBankData.userId.$id,
          senderBankId: senderBankData.$id,
          receiverBankId: receiverBankData.$id,
          email,
        };

        const newTransaction = await createTranaction(transaction);

        if (newTransaction) {
          form.reset();
          toast("Success", { description: "Trasfer successfully" });
          router.push("/");

          return;
        }
      }

      return;
    } catch (error) {
      toast("Error", {
        description: "An error occurred during transfer transaction",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="senderBank"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-[14px] font-medium text-gray-700">
                    Select Source Bank
                  </FormLabel>
                  <FormDescription className="text-[12px] font-normal text-gray-600">
                    Select the bank account you want to transfer funds from
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <BankDropdown
                      accounts={accounts}
                      setValue={form.setValue}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    Transfer Note (Optional)
                  </FormLabel>
                  <FormDescription className="text-[12px] font-normal text-gray-600">
                    Please provide any additional information or instructions
                    related to the transfer
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <textarea
                      placeholder="Write a short note here"
                      className="input-class h-30 border border-gray-200 p-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="payment-transfer_form-details">
          <h2 className="text-[18px] font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-[16px] font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Recipient&apos;s Email Address
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: johndoe@gmail.com"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shareableId"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-5 pt-6">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Receiver&apos;s Plaid Sharable Id
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter the public account number"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-y border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Amount
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: 5.00"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />
        <div className="payment-transfer_btn-box">
          <Button
            type="submit"
            className="payment-transfer_btn bg-bank-gradient"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentForm;
