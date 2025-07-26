import React, { useEffect, useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import RecipeItems from '../components/RecipeItems'
import { useNavigate, useLocation } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from "../components/inputForm"
import axios from 'axios'

export default function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [recipes, setRecipes] = useState([])

  const addRecipe = () => {
    let token = localStorage.getItem("token")
    if (!token) {
      setIsOpen(true)
      return
    }
    navigate('/addRecipe')
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/recipe")
        const allRecipes = res.data.recipes
        const user = JSON.parse(localStorage.getItem("user"))

        if (location.pathname === "/myRecipe" && user?._id) {
          const filtered = allRecipes.filter(r => r.createdBy === user._id)
          setRecipes(filtered)
        } else {
          setRecipes(allRecipes)
        }
      } catch (err) {
        console.error("Failed to fetch recipes", err)
      }
    }

    fetchRecipes()
  }, [location.pathname])

  return (
    <>
      <section className="home flex flex-col-reverse lg:flex-row items-center justify-between mt-12 lg:mt-24 px-4 gap-10">
        <div className="left text-center lg:text-left">
          <h1 className="text-red-500 text-3xl md:text-4xl font-bold mb-4">Food Recipe</h1>
          <h5 className="text-base md:text-lg lg:text-xl mb-6 max-w-xl mx-auto lg:mx-0">
            Discover and share delicious recipes from around the world. Whether you're a home cook or a food enthusiast, this is your place to explore flavors, get inspired, and create magic in the kitchen. Start your food journey today!
          </h5>
          <button
            className="bg-slate-800 text-white px-6 py-2 mt-2"
            onClick={addRecipe}
          >
            Share your recipe
          </button>
        </div>
        <div className="right">
          <img
            src={foodRecipe}
            alt="Delicious food"
            className="w-100 md:w-96 h-auto object-contain mx-auto"
          />
        </div>
      </section>

      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#00cba9" fillOpacity="1" d="M0,224L80,224C160,224,320,224,480,224C640,224,800,224,960,218.7C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
      <div className="justify-center align-center items-center flex">
        <div className="recipe px-6 md:px-16 mt-12 mb-20 w-auto">
            <RecipeItems allRecipes={recipes} />
        </div>
      </div>
    </>
  )
}
