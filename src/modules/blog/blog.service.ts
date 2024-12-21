import QueryBuilder from "../../builder/QueryBuilder";
import { blogSearchableFields } from "./blog.constant";
import { TBlogContent } from "./blog.interface";
import Blog from "./blog.model";

const createBlogContentFromDB = async (payload: TBlogContent) => {
    const result = (await Blog.create(payload)).populate({path: "author"})

    return result;
}
const getBlogContentFromDB = async (query: any, validSortBy: any, sortOrder: any) => {

    // Fetch blogs from DB with sorting
    const allblogs = await Blog.find(query).sort({ [validSortBy]: sortOrder === 'asc' ? 1 : -1 }).populate({
        path: 'author',

    })

    return allblogs

}
const updateBlogContentFromDB = async (
    id: string,
    payload: TBlogContent
) => {
    const result = await Blog.findByIdAndUpdate(id, payload, {
        new: true,
    }).populate({
        path: 'author',

    })
    return result
}

const deleteBlogContentByIdfromDB = async (blogid: string) => {
    const result = await Blog.findByIdAndDelete(blogid)
    return result
}

export const blogServices = {
    createBlogContentFromDB,
    getBlogContentFromDB,
    updateBlogContentFromDB,
    deleteBlogContentByIdfromDB
}