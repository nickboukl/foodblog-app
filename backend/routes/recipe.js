const express = require("express");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
} = require("../controller/recipe.controller");
const router = express.Router();
const authorizeRoles = require("../middlewares/auth.middleware");
const { verifyToken } = require("../middlewares/verifyTokens");

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: API for managing food recipes
 */

/**
 * @swagger
 * /recipe:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of all recipes
 */
router.get("/", getRecipes);

/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe found
 *       404:
 *         description: Recipe not found
 */
router.get("/:id", getRecipe);

/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Add a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - ingredients
 *               - instructions
 *               - time
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *               time:
 *                 type: string
 *               coverImage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, addRecipe);

/**
 * @swagger
 * /recipe/{id}:
 *   put:
 *     summary: Update a recipe by ID
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *               time:
 *                 type: string
 *               coverImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipe updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
router.put("/:id", verifyToken, editRecipe);

/**
 * @swagger
 * /recipe/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
router.delete("/:id", verifyToken, deleteRecipe);

module.exports = router;
