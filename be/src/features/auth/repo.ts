import { UserInsert, UserSelect } from "../../db/models/types";
import { userSchema } from "../../db/models/schema";
import { db } from "../../db";

export const register = async (payload: UserInsert): Promise<UserSelect> => {
  const response = await db.insert(userSchema).values(payload).returning();

  return response[0];
};
