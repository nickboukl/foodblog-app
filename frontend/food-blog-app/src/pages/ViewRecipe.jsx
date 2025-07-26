import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipe/${id}`);
        setRecipe(response.data.recipe);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!recipe) return <p className="text-center mt-10">Recipe not found.</p>;

  return (
    <div className="min-h-screen px-4 pb-12">
      <div className="w-full max-w-4xl mx-auto text-gray-800 font-sans pt-32">
      <h2 className="text-2xl md:text-3xl font-bold text-center mt-16 mb-8 break-words">
        {recipe.title}
      </h2>

        
        <div className="text-center mb-8">
          <img
            src={recipe.coverImage}
            alt={recipe.title}
            className="w-full max-h-[400px] object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-image.jpg";
            }}
          />
          <p className="mt-2 text-sm md:text-base">
            <strong>Time:</strong> {recipe.time}
          </p>
        </div>

        
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <p className="whitespace-pre-wrap">{recipe.instructions}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-emerald-100 hover:bg-emerald-200 text-black text-sm md:text-base rounded-md shadow"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
}
