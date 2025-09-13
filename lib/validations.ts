import { z } from "zod";

export const PaymentSchema = z.object({
  email: z.string().email("Invalid emaill address"),
  note: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(1, "Amount is required"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  shareableId: z.string().min(8, "Please select a valid shareable id"),
});

export const SignUpSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  address1: z.string().min(10, "Address must contain at least 10 characters"),
  city: z.string().min(1, "City is required"),
  state: z
    .string()
    .min(2, "State is required")
    .max(2, "State cannot exceed 2 characters"),
  postalCode: z.string().min(1, "Postal code is required"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .max(10, "Cannot exceed 8 characters"),
  ssn: z.string().min(1, "SSN is required"),
  email: z.email().min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export const SignInSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@_#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});
