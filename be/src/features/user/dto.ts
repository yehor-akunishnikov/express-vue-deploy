import { UserSelect } from "../../db/models/user/types";

export const userPublicDto = (
  user: UserSelect,
): Omit<UserSelect, "password"> => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};
type UserPublicDto = ReturnType<typeof userPublicDto>;
