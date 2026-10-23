import type { UUID } from "crypto";
import { db } from "../prisma/db";

// get all posts - api/v1/posts
const getAllPosts = async () => {
  return await db.orm.public.Posts.orderBy((p) => p.createdAt.desc()).all();
};

// get a one post by id - api/v1/posts/:id
const getOnePost = async (id: UUID) => {
  return await db.orm.public.Posts.where({ id: id })
    .include("comments") // relations
    .first();
};

// create a new post - api/v1/posts
const createNewPost = async (
  title: string,
  content: string,
  category: string,
  tag: "Tech" | "Programming" | "Tutorial",
) => {
  return await db.orm.public.Posts.create({
    title: title,
    content: content,
    category: category,
    tag: tag,
  });
};

// Update a post - api/v1/posts/:id
const updateOnePost = async (
  id: UUID,
  data: {
    title?: string;
    content?: string;
    category?: string;
    tag?: "Tech" | "Programming" | "Tutorial";
  },
) => {
  return await db.orm.public.Posts.where({ id: id }).update(data);
};

// delete a post - api/v1/posts/:id
const deleteOnePost = async (id: UUID) => {
  return await db.orm.public.Posts.where({ id: id }).delete();
};

export default {
  getAllPosts,
  getOnePost,
  createNewPost,
  updateOnePost,
  deleteOnePost,
};
