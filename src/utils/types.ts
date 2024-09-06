export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export type UserState = {
  users: User[];
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
  loading: boolean;
  error: string | null;
};

export type Filters = {
  name: string;
  username: string;
  email: string;
  phone: string;
};
