import { useState } from "react";
import RecipeCard from "../components/RecipeCard";

function RecipeSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    async function searchRecipes(query) {
        const res = await fetch(
            `https://tasty.p.rapidapi.com/recipes/list?q=${query}&from=0&size=10`,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
                    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
                },
            }
        );
        const data = await res.json();

        // data for cooking time less than 30mins
        const filteredData = data.results.filter((res) => res.total_time_minutes && res.total_time_minutes<=30);
        return filteredData;
    }

    async function hanldSearch() {
        if (!query.trim()) return;

        setLoading(true)
        try{
            const data = await searchRecipes(query);
            setResults(data);
        } catch (error) {
            console.error(error);
            alert("Fetch data failed")
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
          <h2>Quick Cook Recipes (under 30 min)</h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter ingredients"
          />
       
          <button onClick={hanldSearch}>Search</button>

          <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                padding: 0,
                margin: 0,
                listStyle: "none",
              }}
          >
            {results.map((r) => (
              <li key={r.id} style={{ flex: "0 0 220px", margin: "8px" }}>
                <RecipeCard recipe={r} />
              </li>
            )
            )}
          </ul>
        </>
    )
}

export default RecipeSearch