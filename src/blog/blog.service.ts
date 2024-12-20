import { TBlogContent } from "./blog.interface";
import Blog from "./blog.model";

const createBlogContentFromDB = async (payload: TBlogContent) => {
    const result = await Blog.create(payload)

    return result;
}

const getBlogContentFromDB = async () => {
    const result = await Blog.find().populate({ path: 'author'})
    return result;
}

export const blogServices = {
    createBlogContentFromDB,
    getBlogContentFromDB
}