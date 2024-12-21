import { RequestHandler } from "express";
import { AdminService } from "./admin.service";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";




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

const DeleteBlogContentFromAdmin : RequestHandler = async (req, res) =>{
    try {
        const userId = req.params.id;
        const user = await AdminService.deleteBlogContentFromAdminDB(userId)


        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found ! !');
        }
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
            statusCode: 200,
        });

    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, "not found")
    }
}

export const adminController = {
    AdminBlockUser,
    DeleteBlogContentFromAdmin
}