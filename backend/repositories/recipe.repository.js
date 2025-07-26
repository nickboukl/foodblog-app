const RecipeDAO = require("../daos/recipe.dao");

module.exports = {
  getAll: RecipeDAO.findAllRecipes,
  getById: RecipeDAO.findRecipeById,
  create: RecipeDAO.createRecipe,
  update: RecipeDAO.updateRecipeById,
  delete: RecipeDAO.deleteRecipeById,
};
