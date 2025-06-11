import { UserSelect } from "../../db/models/user/types";

export const currentUserDto = (
  user: UserSelect,
): Omit<UserSelect, "password"> => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};
type CurrentUserDto = ReturnType<typeof currentUserDto>;
