import type { Request, Response } from "express";
import commentService from "../services/commentService";
import { z } from "zod";

const uuidSchema = z.uuid();

// get all comments = api/v1/posts/:postId/comments
export const getAllComments = async (req: Request, res: Response) => {
  const result = uuidSchema.safeParse(req.params.postId);

  if (!result.success) {
    res.status(400).json({ error: "Invalid UUID format" });
    return;
  }

  const id = result.data as `${string}-${string}-${string}-${string}-${string}`;

  try {
    const allComments = await commentService.getAllComments(id);

    res.status(200).json({
      status: 200,
      message: "Succesfully fetch the comments",
      total: allComments.length,
      data: allComments,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error!" });
  }
};

// Get a single Comment by id - api/v1/posts/:postId/:commentId
export const getOneComment = async (req: Request, res: Response) => {
  const postidResult = uuidSchema.safeParse(req.params.postId);
  const commentidResult = uuidSchema.safeParse(req.params.commentId);

  if (!postidResult.success || !commentidResult.success) {
    res.status(400).json({ error: "Invalid UUID format" });
    return;
  }

  const { postId, commentId } = {
    postId:
      postidResult.data as `${string}-${string}-${string}-${string}-${string}`,
    commentId:
      commentidResult.data as `${string}-${string}-${string}-${string}-${string}`,
  };

  try {
    const oneComment = await commentService.getOneComment(postId, commentId);

    if (!oneComment) {
      res.status(404).json({ status: 404, message: "Comment not found" });
      return;
    }

    res.status(200).json({
      status: 200,
      message: "Succesfully fetch a Comment",
      data: oneComment,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// create a new comment
// comment schema
const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(200, "Content must be under 200 characters."),
});

export const createNewComment = async (req: Request, res: Response) => {
  const postId = uuidSchema.safeParse(req.params.postId);

  if (!postId.success) {
    return res.status(400).json({
      status: 400,
      message: "Invalid UUID",
    });
  }

  const result = createCommentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      errors: result.error.issues,
    });
  }

  const id = postId.data as `${string}-${string}-${string}-${string}-${string}`;

  const { content } = result.data;

  try {
    const createComment = await commentService.createNewComment(id, content);

    res.status(201).json({
      status: 201,
      message: "Succesfully create a new comment",
      data: createComment,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server error!" });
  }
};

// update a comment - api/v1/posts/:postId/:commentId
const updateCommentSchema = z
  .object({
    content: z
      .string()
      .trim()
      .min(1)
      .max(200, "Content must be under 200 characters."),
  })
  .exactPartial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
export const updateOneComment = async (req: Request, res: Response) => {
  const postIdResult = uuidSchema.safeParse(req.params.postId);
  const commentidResult = uuidSchema.safeParse(req.params.commentId);

  if (!postIdResult.success || !commentidResult.success) {
    res.status(400).json({ error: "Invalid UUID format" });
    return;
  }

  const { postId, commentId } = {
    postId:
      postIdResult.data as `${string}-${string}-${string}-${string}-${string}`,
    commentId:
      commentidResult.data as `${string}-${string}-${string}-${string}-${string}`,
  };

  const result = updateCommentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      errors: result.error.issues,
    });
  }

  try {
    const updatedComment = await commentService.updateOneComment(
      postId,
      commentId,
      result.data,
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Succesfully update the posts",
      data: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

// delete a comment - api/v1/posts/:postId/:commentId
export const deleteOneComment = async (req: Request, res: Response) => {
  const postidResult = uuidSchema.safeParse(req.params.postId);
  const commentidResult = uuidSchema.safeParse(req.params.commentId);

  if (!postidResult.success || !commentidResult.success) {
    res.status(400).json({ error: "Invalid UUID format" });
    return;
  }

  const { postId, commentId } = {
    postId:
      postidResult.data as `${string}-${string}-${string}-${string}-${string}`,
    commentId:
      commentidResult.data as `${string}-${string}-${string}-${string}-${string}`,
  };

  try {
    const deletePost = await commentService.deleteOneComment(postId, commentId);

    if (!deletePost) {
      res.status(404).json({ status: 404, message: "Not found" });
      return;
    }

    res.status(204).json({ status: 204, message: "No Content" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error!" });
  }
};
