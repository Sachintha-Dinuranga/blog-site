import express from "express";
import {
  getAllPosts,
  getOnePost,
  createNewPost,
  updateOnePost,
  deleteOnePost,
} from "../../controllers/postController";
const router = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get a list of all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.get("/", getAllPosts);

/**
 * @swagger
 * /posts:id:
 *   get:
 *     summary: Get a single post
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.get("/:id", getOnePost);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, category, tag]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My first post"
 *               content:
 *                 type: string
 *                 example: "Hello world!"
 *               category:
 *                 type: string
 *                 example: "General"
 *               tag:
 *                 type: string
 *                 enum: [Tech, Programming, Tutorial]
 *                 example: "Tech"
 *     responses:
 *       201:
 *         description: Post created
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: "Post created"
 *               data:
 *                 id: "5e61d2d1-154a-4c55-9a7e-8cff0d0d8f3f"
 *                 title: "My first post"
 *                 content: "Hello world!"
 *                 category: "General"
 *                 tag: "Tech"
 *                 createdAt: "2024-01-01T12:00:00.000Z"
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Validation failed"
 *               errors:
 *                 - path: ["title"]
 *                   message: "Title is required"
 */
router.post("/", createNewPost);

/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Partially update a post
 *     description: Only the fields sent in the body are updated.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *               category: { type: string }
 *               tag:
 *                 type: string
 *                 enum: [Tech, Programming, Tutorial]
 *           example:
 *             title: "Updated title"
 *     responses:
 *       200:
 *         description: Post updated
 *       400:
 *         description: Validation failed or empty body
 *       404:
 *         description: Post not found
 */
router.patch("/:id", updateOnePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Post deleted (no body)
 *       404:
 *         description: Post not found
 */
router.delete("/:id", deleteOnePost);

export default router;
