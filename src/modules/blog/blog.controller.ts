import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { blogServices } from "./blog.service"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ErrorRequestHandler, RequestHandler } from "express"
import config from "../../config";
import Blog from "./blog.model";
import { User } from "../user/user.model";



const createBlogContent: RequestHandler = catchAsync(
  async (req, res, next) => {
    const statusCode = 201;
    const { title, content } = req.body;

    // let token = null;
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //   token = req.headers.authorization.split(" ")[1];
    // }

    // console.log(token);

    // if (!token) {
    //   throw new Error("You are not Authorized!");
    // }
    // const author = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;


    const userId = await User.findOne({email: req.user.userEmail})

    const blogData: any = {
      title,
      content,
      author : userId?._id,

    };

    const ressult = await blogServices.createBlogContentFromDB(blogData)

    // Logic to save blogData to database
    res.status(statusCode).json({ message: "Blog created successfully!", ressult });
  }
)

const getBlogContent = catchAsync(async (req, res) => {
    const result = await blogServices.getBlogContentFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Blog retrieved successfully',
        data: result,
    })
 
})


const updateBlogContent : RequestHandler = async (req, res) => {
  try {
    const blogData = req.body
    const blogid = req.params.id
    const result = await blogServices.updateBlogContentFromDB(
      blogid,
      blogData
    )
    if (result) {
      res.status(200).json({
        message: 'Blog updated successfully',
        status: true,
        data: {
          _id: result._id,
          title: result.title,
          content: result.content,
          author: result.author,
        },
      })
    }
  } catch (error) {
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while updating product',
      status: false,
      error: error,
      stack: stackerror.stack,
    })
  }

}


const deleteBlogContent :RequestHandler = async (req, res) => {
  try {
    const blogid = req.params.id
    const result = await blogServices.deleteBlogContentByIdfromDB(blogid)
    if (result) {
      res.status(200).json({
        message: 'Blog deleted successfully',
        status: true,
      })
    }
  } catch (error) {
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while deleting product',
      status: false,
      error: error,
      stack: stackerror.stack,
    })
  }
}


export const blogController = {
    createBlogContent,
    getBlogContent,
    updateBlogContent,
    deleteBlogContent
}


// In user.controller.ts