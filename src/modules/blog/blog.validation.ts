import { z } from "zod";

const createblogContentValidationSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),

  });

export const blogContentValidationSchema = {
    createblogContentValidationSchema
}