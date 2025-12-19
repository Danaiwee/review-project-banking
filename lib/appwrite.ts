// src/lib/server/appwrite.js
"use server";
import { cookies } from "next/headers";
import { Client, Account, Databases, Users } from "node-appwrite";

import { getUserInfo } from "./actions/user.actions";
import { parseStringify } from "./utils";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = (await cookies()).get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

/*Example of account object from appwrite

{
  "$id": "65f1a2b3c4d5e6f7g8h9",        // The unique User ID (very important!)
  "$createdAt": "2023-10-27T12:00:00.000+00:00",
  "$updatedAt": "2023-10-27T15:30:00.000+00:00",
  "name": "John Doe",                   // The full name you passed during signup
  "registration": "2023-10-27T12:00:00.000+00:00",
  "status": true,                       // Whether the account is active
  "passwordUpdate": "2023-10-27T12:00:00.000+00:00",
  "email": "john.doe@example.com",      // User's email address
  "phone": "+123456789",                // Empty if not provided
  "emailVerification": true,            // Whether they clicked a verify link
  "phoneVerification": false,
  "prefs": {},                          // Custom settings (e.g., dark mode: true)
  "accessedAt": "2023-10-28T09:00:00.000+00:00"
}

*/
  