export interface Opportunity {
  id: string;
  company: string;
  jobTitle: string;
  duration: string;
  description: string;
  area: string;
  tags: string[];
  image?: string;
  type: string;
  amount: number;
}

export interface DonationFormData {
  jobTitle: string
  company: string
  description: string
  area: string
  duration: string
  tags: string
  image: string
  amount: number
  type?: string
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserQueryResult {
  loading: boolean;
  error?: Error;
  data:
    | {
        getUser: User;
      }
    | undefined;
}
