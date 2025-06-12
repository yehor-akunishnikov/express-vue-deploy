import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../common/types";
import { setupController } from "../../common/utils";
import { authMW } from "../../middleware/auth";
import { currentUserDto } from "./dto";
import * as userRepo from "./repo";

export default setupController([
  [
    [HTTP_METHOD.GET, "/me"],
    [
      authMW,
      async function getMe(req, res) {
        const userData = await userRepo.findOneByEmail(res.locals.userEmail);

        if (userData) {
          res.status(HTTP_STATUS_CODE.OK).json(currentUserDto(userData));
        } else {
          res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: "Not found" });
        }
      },
    ],
  ],
]);
