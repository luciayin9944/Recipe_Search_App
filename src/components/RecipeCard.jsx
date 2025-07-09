import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe }) {
    const navigate = useNavigate();

    const score = recipe.user_ratings?.score
    ? (recipe.user_ratings.score * 100).toFixed(0) + "%"
    : "N/A";

    return (
        <div onClick={() => navigate(`/recipe/${recipe.id}`)}
            style={{
                width: "250px",
                height: "400px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                margin: "10px",
                cursor: "pointer",
            }}
        >

            <img 
                src={recipe.thumbnail_url} 
                alt={recipe.name} 
                style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "6px",
                }} 
            />
            <h4>{recipe.name}</h4>
            <p>Total Time: {recipe.total_time_minutes} min</p>
            <p style={{ color: "#888", fontSize: "14px" }}>Rating: {score}</p>
        </div>
    );
}

export default RecipeCard;