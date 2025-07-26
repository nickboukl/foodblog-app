function formatRecipe(recipe) {
  return {
    id: recipe._id,
    title: recipe.title,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    time: recipe.time,
    coverImage: recipe.coverImage,
    createdBy: recipe.createdBy,
  };
}

module.exports = {
  formatRecipe,
};
