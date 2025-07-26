import React, { useEffect, useState } from "react";
import axios from "axios";
import foodRecipe from "../assets/foodRecipe.png";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function RecipeItems({ allRecipes: propRecipes }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [favItems, setFavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const path = window.location.pathname;
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavItems(storedFavs);
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (propRecipes) {
        setAllRecipes(propRecipes);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/recipe");
        setAllRecipes(response.data.recipes);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [propRecipes]);

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/recipe/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setAllRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  const favRecipe = (recipe) => {
    let updatedFavs;
    const exists = favItems.find((item) => item.id === recipe.id);

    if (exists) {
      updatedFavs = favItems.filter((item) => item.id !== recipe.id);
    } else {
      updatedFavs = [...favItems, recipe];
    }

    setFavItems(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  let visibleRecipes = allRecipes;

  if (path === "/myRecipe" && currentUser?.id) {
    visibleRecipes = allRecipes.filter((r) => r.createdBy === currentUser.id);
  }

  if ((path === "/favRecipe" || path === "/favourites") && favItems.length > 0) {
    visibleRecipes = allRecipes.filter((r) =>
      favItems.some((fav) => fav.id === r.id)
    );
  }

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {visibleRecipes.map((item, index) => {
        console.log("Rendering recipe item:", item);

        return (
          <div
            key={index}
            className="shadow-md rounded overflow-hidden cursor-pointer"
            onClick={() => {
              if (!item.id) {
                console.warn("⚠️ Missing id for recipe item:", item);
                return;
              }
              navigate(`/viewRecipe/${item.id}`);
            }}
          >
            <img
              src={item.coverImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = foodRecipe;
              }}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="bg-green-100 p-4">
              <div className="mb-2 font-medium text-center text-sm">{item.title}</div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1">
                  <BsStopwatchFill /> {item.time}
                </div>

                {path === "/myRecipe" ? (
                  item.createdBy === currentUser?.id && (
                    <div
                      className="flex items-center space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link to={`/editRecipe/${item.id}`} className="text-black text-lg">
                        <FaEdit />
                      </Link>
                      <MdDelete
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                        className="text-red-500 text-lg cursor-pointer"
                      />
                    </div>
                  )
                ) : (
                  <FaHeart
                    onClick={(e) => {
                      e.stopPropagation();
                      favRecipe(item);
                    }}
                    className={`cursor-pointer ${
                      favItems.some((res) => res.id === item.id) ? "text-red-500" : ""
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
