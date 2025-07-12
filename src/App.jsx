import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from './pages/Home'
import RecipeSearch from './pages/RecipeSearch'
import RecipePage from './pages/RecipePage'


function App() {


  return (
    <>
      <NavBar />
      <main>
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
