"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { signUp } from "@/lib/actions/user.actions";
import { SignUpSchema } from "@/lib/validations";

import CustomInput from "./CustomInput";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      dateOfBirth: "",
      ssn: "",
      postalCode: "",
      email: "",
      password: "",
    },
  });

  const submit = async (data: z.infer<typeof SignUpSchema>) => {
    setIsLoading(true);
    try {
      const response = await signUp(data);
      if (response) toast("Success", { description: "Sign up successfully" });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-semibold text-3xl text-gray-900">Sign up</h1>
        <p className="text-gray-500 text-md font-semibold">
          Please enter your details
        </p>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <div className="flex gap-4">
            <CustomInput
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
            />
            <CustomInput
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
            />
          </div>

          <CustomInput
            control={form.control}
            name="address1"
            label="Address"
            placeholder="Enter your address"
          />

          <CustomInput
            control={form.control}
            name="city"
            label="City"
            placeholder="Enter your city"
          />

          <div className="flex gap-4">
            <CustomInput
              control={form.control}
              name="state"
              label="State"
              placeholder="Enter your state"
            />
            <CustomInput
              control={form.control}
              name="postalCode"
              label="Postal Code"
              placeholder="Enter your postal code"
            />
          </div>

          <div className="flex gap-4">
            <CustomInput
              control={form.control}
              name="dateOfBirth"
              label="Date Of Birth"
              placeholder="Enter your date of birth"
            />
            <CustomInput
              control={form.control}
              name="ssn"
              label="SSN"
              placeholder="Enter your ssn"
            />
          </div>

          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="form-btn bg-bank-gradient"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-[14px] font-normal text-gray-600">
          Already have an account?
        </p>
        <Link href={"/sign-in"} className="form-link text-blue-600">
          Sign in
        </Link>
      </footer>
    </>
  );
};

export default SignUpForm;
