import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const EditRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    time: "",
    ingredients: "",
    instructions: "",
    coverImage: ""
  });

  const navigate = useNavigate();
  const { id: recipeId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/recipe/${recipeId}`);
        setRecipeData(res.data.recipe);
      } catch (err) {
        console.error("Failed to load recipe", err);
      }
    };

    getData();
  }, [recipeId]);

  const onHandleChange = (e) => {
    const val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.value;

    setRecipeData((prev) => ({
      ...prev,
      [e.target.name]: val
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    console.log("Token before request:", localStorage.getItem("token"));

    try {
      await axios.put(`http://localhost:3000/recipe/${recipeId}`, recipeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            className="input"
            name="title"
            value={recipeData.title}
            onChange={onHandleChange}
          />
        </div>
        <div className="form-control">
          <label>Time</label>
          <input
            type="text"
            className="input"
            name="time"
            value={recipeData.time}
            onChange={onHandleChange}
          />
        </div>
        <div className="form-control">
          <label>Ingredients</label>
          <textarea
            className="input-textarea"
            name="ingredients"
            rows="5"
            value={Array.isArray(recipeData.ingredients) ? recipeData.ingredients.join(",") : recipeData.ingredients}
            onChange={onHandleChange}
          ></textarea>
        </div>
        <div className="form-control">
          <label>Instructions</label>
          <textarea
            className="input-textarea"
            name="instructions"
            rows="5"
            value={recipeData.instructions}
            onChange={onHandleChange}
          ></textarea>
        </div>
        <div className="form-control">
          <label>Image URL</label>
          <input
            type="text"
            className="input"
            name="coverImage"
            placeholder="https://example.com/image.jpg"
            value={recipeData.coverImage}
            onChange={onHandleChange}
          />
        </div>
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};
