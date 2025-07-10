import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components";


function RecipePage() {
    const [recipe, setRecipe] = useState();
    const { id } = useParams();


    async function getRecipeDetail(id) {
      const res = await fetch(
        `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`,
        {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
                "X-RapidAPI-Host": "tasty.p.rapidapi.com",
            },
        }
      );

      const data = await res.json()
      console.log(data)   
      return data
    }

    useEffect(() => {
      getRecipeDetail(id)
        .then((data) => {
          setRecipe(data);
        })
        .catch((error) => {
          console.error("Failed to load recipe:", error);
        });
    }, [id])

    if (!recipe) return <p>Loading...</p>;

    return (
        <>
          <h2>{recipe.name}</h2>
          <img 
                src={recipe.thumbnail_url} 
                alt={recipe.name} 
                style={{
                    width: "400px",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "6px",
                }} 
            />

          <p>Cook Time: {recipe.cook_time_minutes} min</p>

          <h4>Ingredients</h4>
          <ul>
            {recipe.sections[0].components.map((item, index) => (
              <li key={index}>{item.raw_text}</li>
            ))}
          </ul>


          <h4>Instructions</h4>
          <ul>
            {recipe.instructions?.map((instruction) => (
              <li key={instruction.id}>
                {instruction.display_text}
              </li>
            ))}
          </ul>

          {recipe.nutrition && (
            <div>
              <h4>Nutrition Fact</h4>
              <li>Calories: {recipe.nutrition?.calories}</li>
              <li>Carbohydrates: {recipe.nutrition?.carbohydrates} g</li>
              <li>Fat: {recipe.nutrition?.fat} g</li>
              <li>Fiber: {recipe.nutrition?.fiber} g</li>
              <li>Protein: {recipe.nutrition?.protein} g</li>
              <li>Sugar: {recipe.nutrition?.sugar} g</li>
            </div>
          )}
        </>
    )
}

export default RecipePage