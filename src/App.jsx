import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from './pages/Home'
import RecipeSearch from './pages/RecipeSearch'
import RecipePage from './pages/RecipePage'

//import './App.css'

function App() {


  return (
    <>
      <NavBar />
      <main style={{ paddingTop: "60px", paddingLeft: "20px" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/recipes' element={<RecipeSearch />} />
            <Route path='/recipe/:id' element={<RecipePage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
