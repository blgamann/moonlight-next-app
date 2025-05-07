import { PrismaClient, Profile } from "@prisma/client";

// Prisma의 Profile 모델과 유사한 타입을 정의 (또는 Profile 타입을 직접 사용)
type ProfileInput = {
  id: number;
  name: string;
  bio?: string | null;
  image?: string | null;
};

/**
 * Creates or ensures a user profile exists.
 * Reusable in business logic (e.g., after user signs up via Auth).
 * @param prisma - The PrismaClient instance.
 * @param profileDetails - Details of the profile to create or update.
 * @returns The created or found profile.
 */
export async function ensureProfile(
  prisma: PrismaClient,
  profileDetails: ProfileInput
): Promise<Profile> {
  const { id, name, bio, image } = profileDetails;

  if (!id || !name) {
    throw new Error("ProfileService: Profile ID and Name are required.");
  }

  return prisma.profile.upsert({
    where: { id },
    update: {
      name,
      bio: bio || null,
      image: image || null,
    },
    create: {
      id,
      name,
      bio: bio || null,
      image: image || null,
    },
  });
}
