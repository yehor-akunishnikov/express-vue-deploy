import { eq } from "drizzle-orm";

import { UserSelect } from "../../db/models/user/types";
import { userSchema } from "../../db/models/schema";
import { db } from "../../db";

export const findOneByEmail = async (
  email: string,
): Promise<UserSelect | null> => {
  const response = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email))
    .limit(1);

  if (response.length) {
    return response[0];
  }

  return null;
};
