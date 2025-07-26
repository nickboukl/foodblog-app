const RecipeService = require("../services/recipe.service");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/images'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.fieldname),
});
const upload = multer({ storage });

const getRecipes = async (req, res) => {
  try {
    const recipes = await RecipeService.getAllRecipes();
    res.status(200).json({ message: "Recipes fetched successfully", recipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await RecipeService.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found." });
    res.status(200).json({ message: "Recipe fetched successfully", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: "Required fields can't be empty" });
  }

  let coverImage = req.file?.filename || req.body.coverImage || "";
  try {
    const recipe = await RecipeService.createRecipe({
      title,
      ingredients,
      instructions,
      time,
      coverImage,
      createdBy: req.user.id,
    });
    res.status(200).json({ message: "Recipe added successfully", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editRecipe = async (req, res) => {
  try {
    const recipe = await RecipeService.updateRecipe(req.params.id, req.body);
    if (!recipe) return res.status(404).json({ error: "Recipe not found." });
    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const deleted = await RecipeService.deleteRecipe(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Recipe not found." });
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
};
