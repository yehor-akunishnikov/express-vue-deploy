import { userSchema } from "../../db/models/user/schema";
import { db } from "../../db";

export const getHelloData = async () => {
  return db.select().from(userSchema);
};
