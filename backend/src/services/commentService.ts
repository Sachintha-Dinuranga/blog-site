import type { UUID } from "crypto";
import { db } from "../prisma/db";

// get all comments - api/v1/posts/:postId/comments
const getAllComments = async (postId: UUID) => {
  return await db.orm.public.Comments.where({ postId })
    .orderBy((c) => c.createdAt.desc())
    .all();
};

// get a one comment by id - api/v1/posts/:postID/:commentID
const getOneComment = async (postId: UUID, id: UUID) => {
  return await db.orm.public.Comments.where({ postId }).first({
    id: id,
  });
};

// // create a new comment under specific post - api/v1/posts/:postID/comments
const createNewComment = async (postId: UUID, content: string) => {
  const post = await db.orm.public.Posts.first({ id: postId });

  if (!post) return null;

  return await db.orm.public.Comments.create({
    postId: postId,
    content: content,
  });
};

// update one comment -> api/v1/post/:postId/comments/:commentId
const updateOneComment = async (
  postId: UUID,
  id: UUID,
  data: { content?: string },
) => {
  const post = await db.orm.public.Posts.first({ id: postId });

  if (!post) return null;

  return await db.orm.public.Comments.where({ postId: postId, id: id }).update(
    data,
  );
};

// delete comment - api/v1/post/:postId/:commentsId
const deleteOneComment = async (postId: UUID, id: UUID) => {
  return await db.orm.public.Comments.where({
    postId: postId,
    id: id,
  }).delete();
};

export default {
  getAllComments,
  getOneComment,
  createNewComment,
  updateOneComment,
  deleteOneComment,
};
