"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { SignUpSchema } from "@/lib/validations";

import CustomInput from "./CustomInput";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      email: "",
      password: "",
    },
  });

  const submit = async (data: z.infer<typeof SignUpSchema>) => {
    console.log(data);
  };

  const isLoading = false;

  return (
    <>
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
            name="address"
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
