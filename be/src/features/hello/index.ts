import { z } from "zod/v4";

import { setupController } from "../../common/utils";
import { HTTP_METHOD } from "../../common/types";
import { authMW } from "../../middleware/auth";
import { userPublicDto } from "../user/dto";
import { getHelloData } from "./repo";

export default setupController([
  [
    [HTTP_METHOD.POST, "/hello"],
    [
      authMW,
      async (req, res) => {
        const body = z.object({ name: z.string().nonempty() }).parse(req.body);
        const data = await getHelloData();

        res.json({
          echo: body.name,
          dataFromDb: data.map((user) => userPublicDto(user)),
        });
      },
    ],
  ],
]);
