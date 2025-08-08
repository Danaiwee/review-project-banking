"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { SignInSchema } from "@/lib/validations";

import CustomInput from "./CustomInput";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

const SignInForm = () => {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (data: z.infer<typeof SignInSchema>) => {
    console.log(data);
  };

  const isLoading = false;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
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
                "Sign in"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-[14px] font-normal text-gray-600">
          Don&apos; t have an account?
        </p>
        <Link href={"/sign-up"} className="form-link text-blue-600">
          Sign up
        </Link>
      </footer>
    </>
  );
};

export default SignInForm;
