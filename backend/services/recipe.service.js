const RecipeRepo = require("../repositories/recipe.repository");
const { formatRecipe } = require("../dtos/recipe.dto");

const getAllRecipes = async () => {
  const recipes = await RecipeRepo.getAll();
  return recipes.map(formatRecipe);
};

const getRecipeById = async (id) => {
  const recipe = await RecipeRepo.getById(id);
  return recipe ? formatRecipe(recipe) : null;
};

const createRecipe = async (data) => {
  const recipe = await RecipeRepo.create(data);
  return formatRecipe(recipe);
};

const updateRecipe = async (id, data) => {
  const recipe = await RecipeRepo.update(id, data);
  return recipe ? formatRecipe(recipe) : null;
};

const deleteRecipe = async (id) => {
  return await RecipeRepo.delete(id);
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
