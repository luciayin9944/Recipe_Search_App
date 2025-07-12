import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const score = recipe.user_ratings?.score
    ? (recipe.user_ratings.score * 100).toFixed(0) + "%"
    : "N/A";

  return (
    <Card onClick={() => navigate(`/recipe/${recipe.id}`)}>
      <Thumbnail src={recipe.thumbnail_url} alt={recipe.name} />
      <Title>{recipe.name}</Title>
      <Meta>Total Time: {recipe.total_time_minutes} min</Meta>
      <Rating>Rating: {score}</Rating>
    </Card>
  );
}

export default RecipeCard;

// Styled Components

const Card = styled.div`
  width: 250px;
  height: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 6px;
`;

const Title = styled.h4`
  margin: 12px 0 8px;
  font-size: 18px;
`;

const Meta = styled.p`
  font-size: 14px;
`;

const Rating = styled.p`
  color: #888;
  font-size: 14px;
`;

