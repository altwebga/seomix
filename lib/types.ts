export type SiteNavigationType = {
  title: string;
  href: string;
  description: string;
};

export type ContentType = {
  id: number;
  label: string;
  value: string;
};

export type UserRoleType = {
  label: string;
  value: string;
};

export type Post = {
  id: string;
  slug: string;
  postType: string;
  title: string;
  description: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
  images: ImageType[];
};

export type ImageType = {
  id: string;
  url: string;
  s3Key: string;
};
