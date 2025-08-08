declare interface User {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}

declare interface Account {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  shareableId: string;
}

declare interface Transaction {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  type: string;
  $createAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
}

declare interface SearchParamsProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

declare type AccountTypes =
  | "depository"
  | "credit"
  | "loan"
  | "investment"
  | "other";

declare type Bank = {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  shareableId: string;
};

declare interface CategoryCount {
  name: string;
  count: number;
  totalCount: number;
}
