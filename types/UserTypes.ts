type UserMetadata = {
  creationTime: number;
  lastSignInTime: number;
};

type MultiFactor = {
  enrolledFactors: any[]; // Adjust this type if you know the structure of the enrolled factors
};

type ProviderData = {
  [key: string]: any; // Adjust or replace `any` based on the known properties
};

export type User = {
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: UserMetadata;
  multiFactor: MultiFactor;
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: ProviderData[];
  providerId: string;
  tenantId: string | null;
  uid: string;
};
