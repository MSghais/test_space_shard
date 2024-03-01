import clientDb, {  User } from "db_mongo";
import { PrismaClient,} from "@prisma/client";

const prisma = new PrismaClient();

export const checkUserExistsByEmail = async (
  email?: string,
  name?: string
  // ): Promise<{ exist: boolean; data: Partial<ProfileDB | undefined> }> => {
): Promise<{ exist: boolean; data: Partial<User | undefined> }> => {
  try {
    if (email) {
      const profileExists = await prisma.user.findFirst({
        where: {
          AND: [
            {
              email: email,
            },
          ],
        },
        select: {
          id: true,
          name: true,
          avatar: true,
          createdAt: true,
        },
      });
      console.log("profileExist", profileExists);

      if (profileExists) {
        return {
          exist: true,
          data: profileExists,
        };
      } else {
        return {
          exist: false,
          data: undefined,
        };
      }
    }

    return undefined;
  } catch (e) {
    console.log("checkUserExistsByEmail error", e);
  }
};

