const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { userService } = require("../services");

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
};

module.exports = {
  getUser,
};
