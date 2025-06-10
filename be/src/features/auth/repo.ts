import { UserInsert, UserSelect } from "../../db/models/types";
import { userSchema } from "../../db/models/schema";
import { DbInsertError } from "../../errors";
import { db } from "../../db";

export const register = async (payload: UserInsert): Promise<UserSelect> => {
  try {
    const response = await db.insert(userSchema).values(payload).returning();

    return response[0];
  } catch (e) {
    throw new DbInsertError("Failed to register", e);
  }
};
