import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import { blogServices } from "./blog.service"
import { RequestHandler } from "express"
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import { IQuery } from "./blog.interface";
import sendResponse from "../../utils/sendResponse";



const createBlogContent: RequestHandler = catchAsync(
  async (req, res, next) => {
    const statusCode = 201;
    const { title, content } = req.body;
    const userId = await User.findOne({ email: req.user.userEmail })

    const blogData: any = {
      title,
      content,
      author: userId?._id,

    };

    const result = await blogServices.createBlogContentFromDB(blogData)

    // blog to save blogData to database
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog created successfully!",
      data: {
        _id: result._id,
        title: result.title,
        content: result.content,
        author: result.author,
      },
    });
  }
)

const getBlogContent: RequestHandler = catchAsync(async (req, res) => {
  const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = req.query;

  // Build query object
  let query: IQuery = {};

  if (search) {
    query.$or = [
      { title: { $regex: search as string, $options: 'i' } },
      { content: { $regex: search as string, $options: 'i' } },
    ];
  }


  if (filter) {
    query.author = filter as string;
  }
  // Ensure sortBy is a string
  const validSortBy = typeof sortBy === 'string' ? sortBy : 'createdAt';

  const result = await blogServices.getBlogContentFromDB(query, validSortBy, sortOrder)
  // Response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog created successfully!",
    data: result.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      author: blog.author,
    })),
  });
}

)


const updateBlogContent: RequestHandler = async (req, res) => {
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


const deleteBlogContent: RequestHandler = async (req, res) => {
  try {
    const blogid = req.params.id
    const result = await blogServices.deleteBlogContentByIdfromDB(blogid)

    if (!result?._id) {
      throw new AppError(httpStatus.NOT_FOUND, " blog not found");
    }

    const statuscode = 200

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: statuscode,
    })


    if (result) {
      const statuscode = 200
      res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: statuscode,
      })
    }
  } catch (error) {
    const stackerror = new Error()
    res.json({
      message: 'An error occurred while deleting blog',
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