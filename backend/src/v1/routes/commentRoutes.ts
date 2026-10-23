import express, { type Request, type Response } from "express";
import {
  getAllComments,
  getOneComment,
  createNewComment,
  updateOneComment,
  deleteOneComment,
} from "../../controllers/commentController";
const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: List all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the parent post
 *     responses:
 *       200:
 *         description: A list of comments (empty array if none)
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Successfully fetched the comments"
 *               data:
 *                 - id: "20b5b4b2-742c-41e3-bbb2-2e181f8ab41d"
 *                   postId: "5e61d2d1-154a-4c55-9a7e-8cff0d0d8f3f"
 *                   content: "Great post!"
 *                   createdAt: "2024-01-01T12:05:00.000Z"
 *       400:
 *         description: Invalid UUID format
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Post not found"
 */
router.get("/posts/:postId/comments", getAllComments);

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   get:
 *     summary: Get a single comment by ID
 *     description: Returns 404 if the comment does not exist or belongs to a different post.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the parent post
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the comment
 *     responses:
 *       200:
 *         description: The comment
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Successfully fetched the comment"
 *               data:
 *                 id: "20b5b4b2-742c-41e3-bbb2-2e181f8ab41d"
 *                 postId: "5e61d2d1-154a-4c55-9a7e-8cff0d0d8f3f"
 *                 content: "Great post!"
 *                 createdAt: "2024-01-01T12:05:00.000Z"
 *       400:
 *         description: Invalid UUID format
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid UUID format"
 *       404:
 *         description: Comment not found under this post
 *         content:
 *           application/json:
 *             example:
 *               error: "Comment not found"
 */
router.get("/posts/:postId/comments/:commentId", getOneComment);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Create a comment on a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the parent post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *                 example: "Great post!"
 *     responses:
 *       201:
 *         description: Comment created
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: "Comment created"
 *               data:
 *                 id: "20b5b4b2-742c-41e3-bbb2-2e181f8ab41d"
 *                 postId: "5e61d2d1-154a-4c55-9a7e-8cff0d0d8f3f"
 *                 content: "Great post!"
 *                 createdAt: "2024-01-01T12:05:00.000Z"
 *                 updatedAt: "2024-01-01T12:05:00.000Z"
 *       400:
 *         description: Validation failed or invalid UUID
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Validation failed"
 *               errors:
 *                 - path: ["content"]
 *                   message: "Content is required"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Post not found"
 */
router.post("/posts/:postId/comments", createNewComment);

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   patch:
 *     summary: Partially update a comment
 *     description: Only the fields sent in the body are updated. An empty body returns 400.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the parent post
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *           example:
 *             content: "Edited comment text"
 *     responses:
 *       200:
 *         description: Comment updated
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Successfully updated the comment"
 *               data:
 *                 id: "20b5b4b2-742c-41e3-bbb2-2e181f8ab41d"
 *                 postId: "5e61d2d1-154a-4c55-9a7e-8cff0d0d8f3f"
 *                 content: "Edited comment text"
 *                 updatedAt: "2024-01-01T13:00:00.000Z"
 *       400:
 *         description: Validation failed, empty body, or invalid UUID
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Validation failed"
 *               errors:
 *                 - path: []
 *                   message: "At least one field must be provided"
 *       404:
 *         description: Comment not found under this post
 *         content:
 *           application/json:
 *             example:
 *               error: "Comment not found"
 */
router.patch("/posts/:postId/comments/:commentId", updateOneComment);

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     description: Returns 404 if the comment does not exist or belongs to a different post.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the parent post
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the comment
 *     responses:
 *       204:
 *         description: Comment deleted (no body)
 *       400:
 *         description: Invalid UUID format
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid UUID format"
 *       404:
 *         description: Comment not found under this post
 *         content:
 *           application/json:
 *             example:
 *               error: "Comment not found"
 */
router.delete("/posts/:postId/comments/:commentId", deleteOneComment);

export default router;
