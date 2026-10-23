import type { Request, Response } from "express";
import postService from "../services/postService";
import { z } from "zod";

const postIdSchema = z.uuid();

// get all posts = api/v1/posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await postService.getAllPosts();

    if (!allPosts) {
      res.send({
        status: 404,
        message: "Posts not found.",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Succesfully fetch the posts.",
      total: allPosts.length,
      data: allPosts,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single post by id - api/v1/posts/:id
export const getOnePost = async (req: Request, res: Response) => {
  const result = postIdSchema.safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({ error: "Invalid UUID format" });
    return;
  }

  const id = result.data as `${string}-${string}-${string}-${string}-${string}`;

  const onePost = await postService.getOnePost(id);

  if (!onePost) {
    res.send({ status: 404, message: "Post not found" });
    return;
  }

  res.send({ status: 200, message: "Succesfully fetch a post", data: onePost });
};

// create a new post
// new post schema
const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be under 200 characters.")
    .regex(/^(?=.*[^\d]).+$/, "Title cannot consist only of numbers"),
  content: z.string().trim().min(1, "Content is required"),
  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .regex(/^(?=.*[^\d]).+$/, "Category cannot be only numbers"),
  tag: z.enum(["Tech", "Programming", "Tutorial"]),
});

export const createNewPost = async (req: Request, res: Response) => {
  const result = createPostSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      errors: result.error.issues,
    });
  }

  const { title, content, category, tag } = result.data;

  const createPost = await postService.createNewPost(
    title,
    content,
    category,
    tag,
  );

  res.send({
    status: 201,
    message: "Succesfully create a new post",
    data: createPost,
  });
};

// update a post - api/v1/posts/:id
const updatePostSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1)
      .max(200)
      .regex(/^(?=.*[^\d]).+$/, "Title cannot consist only of numbers"),
    content: z.string().trim().min(1),
    category: z
      .string()
      .trim()
      .min(1, "Category is required")
      .regex(/^(?=.*[^\d]).+$/, "Category cannot be only numbers"),
    tag: z.enum(["Tech", "Programming", "Tutorial"]),
  })
  .exactPartial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const updateOnePost = async (req: Request, res: Response) => {
  const result = postIdSchema.safeParse(req.params.id);
  const dataResult = updatePostSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: "Invalid UUID format" });
    return;
  }

  if (!dataResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: dataResult.error.issues,
    });
  }

  const id = result.data as `${string}-${string}-${string}-${string}-${string}`;

  try {
    const updatePost = await postService.updateOnePost(id, dataResult.data);

    if (!updatePost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.send({
      status: 200,
      message: "Succesfully update the posts",
      data: updatePost,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: "Internal server error.",
    });
  }
};

// delete a post - api/v1/posts/:id
export const deleteOnePost = async (req: Request, res: Response) => {
  const result = postIdSchema.safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({ error: "Invalid UUID format" });
    return;
  }

  const id = result.data as `${string}-${string}-${string}-${string}-${string}`;

  try {
    const deletePost = await postService.deleteOnePost(id);

    if (!deletePost) {
      res.send({ status: 404, message: "Not found." });
      return;
    }

    res.send({ status: 204, message: "No Content." });
  } catch (error) {
    res.send({ status: 500, message: "Internal server error." });
  }
};
