export type ListingType = {
  id: number;
  value: string;
  label: string;
};

export type UserRoleValue = "admin" | "user" | "client";

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

export type BlogCategoryType = {
  title: string;
  href: string;
  description: string;
};
