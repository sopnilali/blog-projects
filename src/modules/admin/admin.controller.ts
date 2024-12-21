import { RequestHandler } from "express";
import { AdminService } from "./admin.service";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";




const AdminBlockUser: RequestHandler = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await AdminService.UserBlockFromAdmininDB(userId)


        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found ! !');
        }
        // Update the isBlocked property
        user.isBlocked = true;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'User blocked successfully',
            statusCode: 200,
        });

    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, "not found")
    }
}

const DeleteBlogContentFromAdmin: RequestHandler = catchAsync (async (req, res) => {
    const blogid = req.params.id;
    const result = await AdminService.deleteBlogContentFromAdminDB(blogid)

    if (result.deletedCount === 0 ) {
        throw new AppError(httpStatus.NOT_FOUND, " blog not found");
    }

    const statuscode = 200

    res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: statuscode,
    })

})

export const adminController = {
    AdminBlockUser,
    DeleteBlogContentFromAdmin
}