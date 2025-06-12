import { z } from "zod/v4";

import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../common/types";
import { setupController } from "../../common/utils";
import { authMW } from "../../middleware/auth";

export default setupController([
  [
    [HTTP_METHOD.POST, "/hello"],
    [
      authMW,
      async function hello(req, res) {
        const body = z.object({ name: z.string().nonempty() }).parse(req.body);

        res.status(HTTP_STATUS_CODE.OK).json({
          echo: body.name,
        });
      },
    ],
  ],
]);
