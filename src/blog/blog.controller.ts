
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse"
import { blogServices } from "./blog.service"


const createBlogContent = catchAsync(async (req, res) => {
    const result = await blogServices.createBlogContentFromDB(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Blog created successfully',
        data: {
            _id: result._id,
            title: result.title,
            content: result.content,
            author: result.author,
        },
    })

})

const getBlogContent = catchAsync(async (req, res) => {
    const result = await blogServices.getBlogContentFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Blog retrieved successfully',
        data: result,
    })
 
})



export const blogController = {
    createBlogContent,
    getBlogContent,
}


// In user.controller.ts