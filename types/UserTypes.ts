type UserMetadata = {
  creationTime: number;
  lastSignInTime: number;
};

type MultiFactor = {
  enrolledFactors: any[]; 
};

type ProviderData = {
  [key: string]: any;
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
