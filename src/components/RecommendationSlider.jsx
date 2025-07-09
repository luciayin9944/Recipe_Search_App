import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";

async function getTopRecipes() {
    const res = await fetch(
            // `https://tasty.p.rapidapi.com/recipes/list`,
            `https://tasty.p.rapidapi.com/recipes/list?from=0&size=500`,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
                    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
                },
            }
        );
    const data = await res.json();

    const filteredData = data.results.filter(
        (r) =>
            r.total_time_minutes &&
            r.total_time_minutes <= 30 &&
            r.user_ratings &&
            r.user_ratings.score >= 0.85
    );

    const topFilteredData = filteredData.sort((a, b)=> b.user_ratings.score - a.user_ratings.score).slice(0, 10);
    return topFilteredData
}

function RecommendationSlider() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        getTopRecipes()
            .then((data) => {
                setRecipes(data);
            })
            .catch((error) => {
                console.error("Failed to load top recipes:", error);
            });
    }, []);

    return (
        <>
          <h3>Today's top Recipes</h3>
          <ScrollContainer>
            {recipes.map((r) => (
                <CardWrapper key={r.id}>
                    <RecipeCard recipe={r} />
                </CardWrapper>
            ))}
        </ScrollContainer>
        </>
    );
}



// Styled components
const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
  padding: 16px 0;

  /* slider */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardWrapper = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 400px;
`;



export default RecommendationSlider;