import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function RecipePage() {
  const [recipe, setRecipe] = useState(null);
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
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    getRecipeDetail(id)
      .then((data) => setRecipe(data))
      .catch((error) => console.error("Failed to load recipe:", error));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <PageContainer>
      <ContentSection>
        <LeftColumn>
          <Heading>{recipe.name}</Heading>
          <Meta>
            <MetaRow>
              <p><strong>Total Time:</strong> {recipe.total_time_minutes || 'N/A'} min</p>
              <p><strong>Prep:</strong> {recipe.prep_time_minutes || 'N/A'} min</p>
              <p><strong>Cook:</strong> {recipe.cook_time_minutes || 'N/A'} min</p>
            </MetaRow>
            <MetaRow>
              <p><strong>Serves:</strong> {recipe.num_servings || 'N/A'}</p>
            </MetaRow>
          </Meta>
{/* 
          <IngredientWrapper> */}
            <SubHeading>Ingredients</SubHeading>
            <List>
              {recipe.sections?.[0]?.components.map((item, index) => (
                <ListItem key={index}>• {item.raw_text}</ListItem>
              ))}
            </List>
          {/* </IngredientWrapper> */}
        </LeftColumn>
        

        <RightColumn>
          <RecipeImage src={recipe.thumbnail_url} alt={recipe.name} />

          {recipe.nutrition && (
            <NutritionWrapper>
              <SubHeading>Nutrition Facts</SubHeading>
              <List>
                <ListItem>Calories: {recipe.nutrition.calories}</ListItem>
                <ListItem>Carbs: {recipe.nutrition.carbohydrates} g</ListItem>
                <ListItem>Fat: {recipe.nutrition.fat} g</ListItem>
                <ListItem>Protein: {recipe.nutrition.protein} g</ListItem>
                <ListItem>Fiber: {recipe.nutrition.fiber} g</ListItem>
                <ListItem>Sugar: {recipe.nutrition.sugar} g</ListItem>
              </List>
            </NutritionWrapper>
          )}
        </RightColumn>
      </ContentSection>

      <InstructionsSection>
        {/* <InstructionsWrapper> */}
          <SubHeading>Instructions</SubHeading>
          <List>
            {recipe.instructions?.map((instruction, idx) => (
              <ListItem key={instruction.id}><strong>{idx + 1}. </strong>{instruction.display_text}</ListItem>
            ))}
          </List>
        {/* </InstructionsWrapper> */}
      </InstructionsSection>
    </PageContainer>
  );
}


const PageContainer = styled.div`
  background-color: rgb(21, 52, 96);
  color: #d1d5db;
  padding: 80px;
  min-height: 100vh;
  font-family: 'Helvetica Neue', sans-serif;
`;


const ContentSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;    
  width: 100%;
`;


const IngredientWrapper = styled.div`
  border: 0.5px solid #ccc;
  border-radius: 12px;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  min-height: 60vh;
`;



const InstructionsSection = styled.div`
  margin-top: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;


const InstructionsWrapper = styled.div`
  border: 0.5px solid #ccc;
  border-radius: 12px;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  width: 90%;
`;


const LeftColumn = styled.div`
  flex: 1.5;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecipeImage = styled.img`
  max: 100%;
  max-width: 400px;
  max-height: 600px;
  border-radius: 0 0 100px 0;
  object-fit: cover;
  margin-top: 40px;
  margin-bottom: 40px;
`;


const NutritionWrapper = styled.div`
  border: 1px solid #ffffff66;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  max-width: 380px;
`;

const Heading = styled.h1`
  font-size: 42px;
  margin-bottom: 36px;
  color: #ffffff;
`;

const SubHeading = styled.h3`
  margin-top: 36px;
  font-size: 28px;
  border-bottom: 1px solid #fff;
  padding-bottom: 4px;
  color: #ffffff;
`;

const Meta = styled.div`
  margin-bottom: 24px;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 12px;
  font-size: 20px;

  p {
    margin: 0;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 12px;
`;


const ListItem = styled.li`
  margin-bottom: 8px;
  line-height: 1.6;
`;

export default RecipePage;






// White Background Style

// const PageContainer = styled.div`
//   background-color: rgb(250, 251, 252);
//   color: #d1d5db;
//   padding: 40px;
//   min-height: 100vh;
//   font-family: 'Helvetica Neue', sans-serif;
// `;

// const ContentSection = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 40px;
//   align-items: flex-start;
// `;

// const IngredientWrapper = styled.div`
//   border: 0.5px solid #ccc;
//   border-radius: 12px;
//   background-color: #f9f9f9;
//   padding: 16px;
//   border-radius: 8px;
//   width: 100%;
//   max-width: 600px;
//   min-height: 60vh;
// `;

// const InstructionsSection = styled.div`
//   margin-top: 40px;
// `;

// const InstructionsWrapper = styled.div`
//   border: 0.5px solid #ccc;
//   border-radius: 12px;
//   background-color: #f9f9f9;
//   padding: 16px;
//   border-radius: 8px;
//   width: 90%;
// `;

// const LeftColumn = styled.div`
//   flex: 1;
// `;

// const RightColumn = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const RecipeImage = styled.img`
//   max: 100%;
//   max-width: 300px;
//   max-height: 400px;
//   border-radius: 0 0 100px 0;
//   object-fit: cover;
//   margin-bottom: 40px;
// `;

// const NutritionWrapper = styled.div`
//   border: 0.5px solid #ccc;
//   border-radius: 12px;
//   background-color: #f9f9f9;
//   padding: 16px;
//   border-radius: 8px;
//   width: 100%;
//   max-width: 280px;
// `;

// const Heading = styled.h1`
//   font-size: 42px;
//   margin-bottom: 16px;
//   color: rgb(21, 52, 96);
// `;

// const SubHeading = styled.h4`
//   margin-top: 32px;
//   font-size: 18px;
//   border-bottom: 1px solid #fff;
//   padding-bottom: 4px;
// `;

// const Meta = styled.div`
//   margin-bottom: 24px;
// `;

// const MetaRow = styled.div`
//   display: flex;
//   gap: 24px;
//   margin-bottom: 8px;

//   p {
//     margin: 0;
//   }
// `;

// const List = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin-top: 12px;
// `;


// const ListItem = styled.li`
//   margin-bottom: 8px;
//   line-height: 1.6;
// `;

// export default RecipePage;

























// // without styling

// import { useState, useEffect } from "react"
// import { useParams } from "react-router-dom";
// import styled from "styled-components";


// function RecipePage() {
//     const [recipe, setRecipe] = useState(null);
//     const { id } = useParams();


//     async function getRecipeDetail(id) {
//       const res = await fetch(
//         `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`,
//         {
//             method: "GET",
//             headers: {
//                 "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
//                 "X-RapidAPI-Host": "tasty.p.rapidapi.com",
//             },
//         }
//       );

//       const data = await res.json()
//       console.log(data)   
//       return data
//     }

//     useEffect(() => {
//       getRecipeDetail(id)
//         .then((data) => {
//           setRecipe(data);
//         })
//         .catch((error) => {
//           console.error("Failed to load recipe:", error);
//         });
//     }, [id])

//     if (!recipe) return <p>Loading...</p>;

//     return (
//         <>
//           <h2>{recipe.name}</h2>
//           <img 
//                 src={recipe.thumbnail_url} 
//                 alt={recipe.name} 
//                 style={{
//                     width: "400px",
//                     height: "250px",
//                     objectFit: "cover",
//                     borderRadius: "6px",
//                 }} 
//             />

//           <p>Cook Time: {recipe.cook_time_minutes} min</p>

//           <h4>Ingredients</h4>
//           <ul>
//             {recipe.sections[0].components.map((item, index) => (
//               <li key={index}>{item.raw_text}</li>
//             ))}
//           </ul>


//           <h4>Instructions</h4>
//           <ul>
//             {recipe.instructions?.map((instruction) => (
//               <li key={instruction.id}>
//                 {instruction.display_text}
//               </li>
//             ))}
//           </ul>

//           {recipe.nutrition && (
//             <div>
//               <h4>Nutrition Fact</h4>
//               <li>Calories: {recipe.nutrition?.calories}</li>
//               <li>Carbohydrates: {recipe.nutrition?.carbohydrates} g</li>
//               <li>Fat: {recipe.nutrition?.fat} g</li>
//               <li>Fiber: {recipe.nutrition?.fiber} g</li>
//               <li>Protein: {recipe.nutrition?.protein} g</li>
//               <li>Sugar: {recipe.nutrition?.sugar} g</li>
//             </div>
//           )}
//         </>
//     )
// }

// export default RecipePage