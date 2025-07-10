import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

    const topFilteredData = filteredData
    .sort((a, b) => b.user_ratings.score - a.user_ratings.score)
    .slice(0, 6);

    console.log(topFilteredData)
    return topFilteredData;
}

function RecommendationSlider() {
    const [recipes, setRecipes] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);

    useEffect(() => {
        getTopRecipes()
            .then((data) => {
                setRecipes(data);
            })
            .catch((error) => {
                console.error("Failed to load top recipes:", error);
            });
    }, []);

    useEffect(() => {
        if (recipes.length === 0) return;

        const autoplay = setInterval(() => {
            setCurrIndex((prevIndex) =>
                prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(autoplay);
    }, [recipes]);


    return (
        <SliderWrapper>
            <Title>🔥 Today's Top Recipe</Title>
            {recipes.length > 0 && (
                <CardContainer>
                    <SliderCard recipe={recipes[currIndex]} />
                </CardContainer>
            )}
        </SliderWrapper>
    );
}

function SliderCard({ recipe }) {
    const navigate = useNavigate();

    const score = (recipe.user_ratings.score * 100).toFixed(0) + "%";

    return (
        <CardContainer onClick={()=> navigate(`/recipe/${recipe.id}`)}>
            <Image src={recipe.thumbnail_url} alt={recipe.name} />
            <ScoreBadge>🔥{score}</ScoreBadge>
        </CardContainer>
    )

}

// Styled components
const Container = styled.div`
  padding: 2rem 1rem;
  min-height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const SliderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 60vh;
// `;

const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 2rem 1rem;
`;


const Title = styled.h2`
  display: flex;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  width: 700px;
  height: 400px;
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

  &:hover img {
    transform: scale(1.05);
    filter: brightness(0.95);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const ScoreBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.85);
  color: #222;
  font-weight: bold;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;


export default RecommendationSlider;




// import { useEffect, useState } from "react";
// import RecipeCard from "./RecipeCard";
// import styled from "styled-components";

// async function getTopRecipes() {
//     const res = await fetch(
//             // `https://tasty.p.rapidapi.com/recipes/list`,
//             `https://tasty.p.rapidapi.com/recipes/list?from=0&size=500`,
//             {
//                 method: "GET",
//                 headers: {
//                     "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
//                     "X-RapidAPI-Host": "tasty.p.rapidapi.com",
//                 },
//             }
//         );
//     const data = await res.json();

//     const filteredData = data.results.filter(
//         (r) =>
//             r.total_time_minutes &&
//             r.total_time_minutes <= 30 &&
//             r.user_ratings &&
//             r.user_ratings.score >= 0.85
//     );

//     const topFilteredData = filteredData.sort((a, b)=> b.user_ratings.score - a.user_ratings.score);
//     console.log(topFilteredData)
//     return topFilteredData
// }


// function RecommendationSlider() {
//     const [recipes, setRecipes] = useState([])

//     useEffect(() => {
//         getTopRecipes()
//             .then((data) => {
//                 setRecipes(data);
//             })
//             .catch((error) => {
//                 console.error("Failed to load top recipes:", error);
//             });
//     }, []);

//     return (
//         <>
//           <h3>Today's top Recipes</h3>
//           <ScrollContainer>
//             {recipes.map((r) => (
//                 <CardWrapper key={r.id}>
//                     <RecipeCard recipe={r} />
//                 </CardWrapper>
//             ))}
//         </ScrollContainer>
//         </>
//     );
// }



// // Styled components
// const ScrollContainer = styled.div`
//   display: flex;
//   overflow-x: auto;
//   scroll-snap-type: x mandatory;
//   gap: 16px;
//   padding: 16px 0;

//   /* slider */
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const CardWrapper = styled.div`
//   flex: 0 0 auto;
//   scroll-snap-align: start;
//   width: 400px;
// `;



// export default RecommendationSlider;
