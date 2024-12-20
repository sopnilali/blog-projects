import {  Types } from "mongoose";

export interface TBlogContent {
    title: string
    content: string
    author: Types.ObjectId;
    isPublished: boolean,
    createdAt: NativeDate
    updatedAt: NativeDate
  }
  