import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function saveUserProfile(data: {
  name: string;
  email?: string;
  role?: UserRole;
}) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const { name, email, role } = data;
  // Ensure role change is restricted based on user privileges
  if (role && session.user.role !== "admin") {
    throw new Error("Only admins can change roles.");
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name,
      email,
      role: session.user.role === "admin" ? role : undefined,
    },
  });
}
