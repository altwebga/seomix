'use server';

import { prisma } from '@/prisma';
import { PostType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function pathForType(type: PostType) {
  switch (type) {
    case 'POST':
      return '/dashboard/blog';
    case 'PORTFOLIO':
      return '/dashboard/portfolio';
    case 'SERVICES':
      return '/dashboard/services';
  }
}

export async function createPost(data: { title: string; postType: PostType; content: string }) {
  const slug = slugify(data.title);

  await prisma.post.create({
    data: {
      title: data.title,
      slug,
      type: data.postType,
      content: data.content,
    },
  });

  revalidatePath(pathForType(data.postType));
}

export async function deletePost(id: string, type: PostType) {
  await prisma.post.delete({ where: { id } });
  revalidatePath(pathForType(type));
}
