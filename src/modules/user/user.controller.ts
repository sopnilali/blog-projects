import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.sevice";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserFromDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  })

})

const GetUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUserFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved succesfully',
    data: result,
  })
})

export const UserController = {
  createUser,
  GetUsers
}