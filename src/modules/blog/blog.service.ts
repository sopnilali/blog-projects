import { TBlogContent } from "./blog.interface";
import Blog from "./blog.model";

const createBlogContentFromDB = async (payload: TBlogContent) => {
    const result = await Blog.create(payload)

    return result;
}

const getBlogContentFromDB = async () => {
    const result = await Blog.find().populate({ path: 'author' })
    return result;
}

const updateBlogContentFromDB = async (
    id: string,
    payload: TBlogContent
) => {
    const result = await Blog.findByIdAndUpdate(id, payload, {
        new: true,
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