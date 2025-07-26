import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddFoodRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    time: "",
    ingredients: "",
    instructions: "",
    coverImage: ""
  });

  const navigate = useNavigate();

  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "coverImage"
        ? e.target.value
        : e.target.value;

    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3000/recipe", recipeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(() => navigate("/"))
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={onHandleSubmit}>
          <div className="form-control">
            <label>Title</label>
            <input
              type="text"
              className="input"
              name="title"
              onChange={onHandleChange}
            ></input>
          </div>
          <div className="form-control">
            <label>Time</label>
            <input
              type="text"
              className="input"
              name="time"
              onChange={onHandleChange}
            ></input>
          </div>
          <div className="form-control">
            <label>Ingredients</label>
            <textarea
              type="text"
              className="input-textarea"
              name="ingredients"
              rows="5"
              onChange={onHandleChange}
            ></textarea>
          </div>
          <div className="form-control">
            <label>Instructions</label>
            <textarea
              type="text"
              className="input-textarea"
              name="instructions"
              rows="5"
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
              onChange={onHandleChange}
            ></input>
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </>
  );
};
