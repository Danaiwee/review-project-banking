declare interface SignUpParams {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postalCode: string;
  state: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
}

declare interface CreateFundingSourceOptions {
  customerId: string; //Dwolla customer ID
  fundingSourceName: string;
  plaidToken: string;
  _links: object;
}

declare interface TransferParams {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
}

declare interface AddFundingSourceParams {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
}

declare interface NewDwollaCustomerParams {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}

declare interface getUserInfoParams {
  userId: string;
}

declare interface SignInParams {
  email: string;
  password: string;
}

declare interface ExchangePublicTokenParams {
  publicToken: string;
  user: User;
}

declare interface CreateBankAccountParams {
  userId: string;
  bankId: string;
  accountId: string;
  accessToken: string;
  fundingSourceUrl: string;
  shareableId: string;
}

declare interface GetBanksParams {
  userId: string;
}

declare interface GetAccountsParams {
  userId: string;
}

declare interface GetInstitutionParams {
  institutionId: string;
}

declare interface createTransactionParams {
  note: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverBankId: string;
  email: string;
}

declare interface GetBankParams {
  appwriteItemId: string;
}

declare interface GetSampleTransactionsParams {
  accessToken: string;
}

declare interface GetAccountWithSampleTransactionsParams {
  appwriteItemId: string;
}

declare interface GetTransactionsParams {
  appwriteItemId: string;
}

declare interface GetAccountWithTransactionsParams {
  appwriteItemId: string;
}

declare interface GetBankByAccountId {
  accountId: string;
}
