import React, { Children } from 'react';
import {BrowserRouter, Routes, Route} from "react-router";
import './App.css'
import Home from './pages/Home';
import MainNavigation from './components/MainNavigation';
import axios, { all } from 'axios';
import { AddFoodRecipe } from './pages/AddFoodRecipe';
import { EditRecipe } from "./pages/EditRecipe";
import NotFound from './pages/NotFound';
import ViewRecipe from './pages/ViewRecipe';
import UsersPage from "./pages/UsersPage";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainNavigation />}>
          <Route index element={<Home />} />
          <Route path="myRecipe" element={<Home />} />
          <Route path="favRecipe" element={<Home />} />
          <Route path="addRecipe" element={<AddFoodRecipe />} />
          <Route path="editRecipe/:id" element={<EditRecipe />} />
          <Route path="viewRecipe/:id" element={<ViewRecipe />} />
          <Route path="admin/users" element={<UsersPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

