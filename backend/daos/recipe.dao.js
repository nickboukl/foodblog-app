const Recipe = require("../models/recipe");

const findAllRecipes = () => Recipe.find({}).sort({ createdAt: -1 });
const findRecipeById = (id) => Recipe.findById(id);
const createRecipe = (data) => Recipe.create(data);
const updateRecipeById = (id, data) => Recipe.findByIdAndUpdate(id, data, { new: true });
const deleteRecipeById = (id) => Recipe.findByIdAndDelete(id);

module.exports = {
  findAllRecipes,
  findRecipeById,
  createRecipe,
  updateRecipeById,
  deleteRecipeById,
};
