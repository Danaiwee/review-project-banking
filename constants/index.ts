import { ROUTES } from "./routes";

export const AUTHUSER: User = {
  $id: "usr_abc123456",
  email: "johndoe@example.com",
  userId: "user_001",
  dwollaCustomerUrl: "https://api-sandbox.dwolla.com/customers/abcdef-123456",
  dwollaCustomerId: "abcdef-123456",
  firstName: "John",
  lastName: "Doe",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  dateOfBirth: "1990-01-15",
  ssn: "1234", // Usually just last 4 digits are stored
};

export const SIDEBAR_LINKS = [
  { name: "Home", route: ROUTES.HOME, icon: "/icons/home.svg" },
  { name: "My Banks", route: ROUTES.MYBANKS, icon: "/icons/dollar-circle.svg" },
  {
    name: "Transaction History",
    route: ROUTES.TRANSACTION_HISTORY,
    icon: "/icons/transaction.svg",
  },
  {
    name: "Transfer Fund",
    route: ROUTES.PAYMENT_TRANSFER,
    icon: "/icons/money-send.svg",
  },
];

export const ACCOUNTS = [
  {
    id: "acc_001",
    availableBalance: 2450.75,
    currentBalance: 2500.0,
    officialName: "Plaid Checking",
    mask: "1234",
    institutionId: "ins_109508",
    name: "Everyday Checking",
    type: "depository",
    subtype: "checking",
    appwriteItemId: "item_abc123",
    shareableId: "share_001",
  },
  {
    id: "acc_002",
    availableBalance: 5200.4,
    currentBalance: 5300.0,
    officialName: "Plaid Savings",
    mask: "5678",
    institutionId: "ins_109509",
    name: "High Yield Savings",
    type: "depository",
    subtype: "savings",
    appwriteItemId: "item_def456",
    shareableId: "share_002",
  },
];

export const BACKGROUND_CHART_COLORS = [
  "#032b75", // darker navy
  "#0747b6", // your original
  "#0e56c4", // mid blue
  "#2265d8", // your original
  "#3282e6", // brighter
  "#2f91fa", // your original
  "#53a7fd", // sky blue
  "#78bbff", // soft blue
  "#a2d0ff", // pastel blue
  "#d1e8ff", // very light
];

export const TRANSACTIONS = [
  {
    id: "txn_001",
    $id: "txn_001",
    name: "Starbucks",
    paymentChannel: "in store",
    type: "debit",
    accountId: "acc_001",
    amount: 5.75,
    pending: false,
    category: "Coffee Shops",
    date: "2025-08-05",
    image: "/images/transactions/starbucks.png",
    $createAt: "2025-08-05T09:23:00Z",
    channel: "POS",
    senderBankId: "bank_abc123",
    receiverBankId: "bank_xyz987",
  },
  {
    id: "txn_002",
    $id: "txn_002",
    name: "Apple Music",
    paymentChannel: "online",
    type: "debit",
    accountId: "acc_001",
    amount: 10.99,
    pending: false,
    category: "Music & Audio",
    date: "2025-08-03",
    image: "/images/transactions/apple-music.png",
    $createAt: "2025-08-03T02:12:00Z",
    channel: "Online",
    senderBankId: "bank_abc123",
    receiverBankId: "bank_appl012",
  },
  {
    id: "txn_003",
    $id: "txn_003",
    name: "Salary August",
    paymentChannel: "direct deposit",
    type: "credit",
    accountId: "acc_001",
    amount: 3000.0,
    pending: false,
    category: "Payment",
    date: "2025-08-01",
    image: "/images/transactions/salary.png",
    $createAt: "2025-08-01T08:00:00Z",
    channel: "ACH",
    senderBankId: "bank_company789",
    receiverBankId: "bank_abc123",
  },
  {
    id: "txn_004",
    $id: "txn_004",
    name: "Venmo Transfer",
    paymentChannel: "mobile",
    type: "debit",
    accountId: "acc_002",
    amount: 150.0,
    pending: true,
    category: "Transfers",
    date: "2025-08-06",
    image: "/images/transactions/venmo.png",
    $createAt: "2025-08-06T13:40:00Z",
    channel: "P2P",
    senderBankId: "bank_abc123",
    receiverBankId: "bank_p2p456",
  },
];

export const TRANSACTION_CATEGORY_STYLES = {
  "Coffee Shops": {
    borderColor: "border-pink-500",
    backgroundColor: "bg-pink-500",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-transparent",
  },
  "Music & Audio": {
    borderColor: "border-green-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bank Fees": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "border-blue-500",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};

export const BANKS = [
  {
    $id: "bank_001",
    accountId: "acc_001",
    bankId: "bank_chase_001",
    accessToken: "access-sandbox-1234567890",
    fundingSourceUrl: "https://api.dwolla.com/funding-sources/12345678",
    userId: "user_001",
    shareableId: "shareable_001",
  },
  {
    $id: "bank_002",
    accountId: "acc_002",
    bankId: "bank_boa_002",
    accessToken: "access-sandbox-0987654321",
    fundingSourceUrl: "https://api.dwolla.com/funding-sources/87654321",
    userId: "user_002",
    shareableId: "shareable_002",
  },
  {
    $id: "bank_003",
    accountId: "acc_003",
    bankId: "bank_wellsfargo_003",
    accessToken: "access-sandbox-1122334455",
    fundingSourceUrl: "https://api.dwolla.com/funding-sources/11223344",
    userId: "user_001",
    shareableId: "shareable_003",
  },
  {
    $id: "bank_004",
    accountId: "acc_004",
    bankId: "bank_citi_004",
    accessToken: "access-sandbox-5566778899",
    fundingSourceUrl: "https://api.dwolla.com/funding-sources/55667788",
    userId: "user_003",
    shareableId: "shareable_004",
  },
];

export const TOP_CATEGORY_STYLES = {
  "Coffee Shops": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/coffee.svg",
  },
  "Music & Audio": {
    bg: "bg-indigo-25",
    circleBg: "bg-indigo-100",
    text: {
      main: "text-indigo-900",
      count: "text-indigo-700",
    },
    progress: {
      bg: "bg-indigo-100",
      indicator: "bg-indigo-700",
    },
    icon: "/icons/music.svg",
  },
  Payment: {
    bg: "bg-green-25",
    circleBg: "bg-green-100",
    text: {
      main: "text-green-900",
      count: "text-green-700",
    },
    progress: {
      bg: "bg-green-100",
      indicator: "bg-green-700",
    },
    icon: "/icons/payment.svg",
  },
  Transfers: {
    bg: "bg-yellow-25",
    circleBg: "bg-yellow-100",
    text: {
      main: "text-yellow-900",
      count: "text-yellow-700",
    },
    progress: {
      bg: "bg-yellow-100",
      indicator: "bg-yellow-700",
    },
    icon: "/icons/transfer.svg",
  },
  default: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/pay.svg",
  },
};
