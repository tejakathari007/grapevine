const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const path = require("path");
const { isEmpty, isInvalid, resuableFalseError } = require("@custom_response");
const {
  middleware: { validateReqestData, asyncWrapper },
  aws: { S3 },
} = require("@utils");
const { users } = require("@services");

router.get("/:userUuid/:fileUuid", (req, res) => {
  const { userUuid, fileUuid } = req.params;
  console.log(userUuid, fileUuid);
  try {
    const readStream = S3.getFileStream(userUuid + "/" + fileUuid);
    readStream.pipe(res);
  } catch (err) {
    res.json({
      error: "Something went wrong",
    });
  }

  //   res.sendFile(
  //     path.join(
  //       __dirname,
  //       "../../Assets",
  //       req.params.userUuid,
  //       req.params.fileUuid
  //     )
  //   );
});

module.exports = router;
