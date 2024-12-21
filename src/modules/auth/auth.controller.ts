import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";



const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;
  
    res.cookie('refreshToken', refreshToken, {
      secure: config.node_env === 'production',
      httpOnly: true,
    });
  
    sendResponse(res, {
      success: true,
      message: 'Login successful',
      statusCode: httpStatus.OK,
      data: {
        tokken: accessToken,
      },
    });

  //   res.status(200).json({
  //     success: true,
  //     message: 'Login successful',
  //     statusCode: 200,
  // });

  });

  const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token is retrieved succesfully!',
      data: result,
    });
  });

  export const AuthController = {
    loginUser,
    refreshToken,
  };