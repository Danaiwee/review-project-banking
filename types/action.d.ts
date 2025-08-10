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
