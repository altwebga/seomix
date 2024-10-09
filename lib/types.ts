export type UserRoleValue = "admin" | "user";

export type UserRoleType = {
  label: string;
  value: UserRoleValue;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  image?: string;
  emailVerified?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SiteNavigationType = {
  title: string;
  href: string;
};

export type ContentType = {
  id: number;
  label: string;
  value: string;
};
