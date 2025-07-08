import { useState } from "react";
import RecipeCard from "../components/RecipeCard";

function RecipeSearch() {
    const [query, setQuery] = useState("");
    const [maxTime, setMaxTIme] = useState(30);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    async function searchRecipes(query, maxTime) {
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

        // data for cooking time less than maxTime
        const filteredData = data.results.filter((res) => res.total_time_minutes && res.total_time_minutes<=maxTime);
        return filteredData;
    }

    async function hanldSearch() {
        if (!query.trim()) return;

        setLoading(true)
        setHasSearched(true)
        try{
            const data = await searchRecipes(query, maxTime);
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
          <h2>Quick Cook Recipes</h2>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <label>
                Max Time:
                <select
                value={maxTime}
                onChange={(e)=> setMaxTIme(Number(e.target.value))}
                style={{ marginLeft: "8px" }}
                >
                    <option value={30}>30 min</option>
                    <option value={20}>20 min</option>
                    <option value={10}>10 min</option>               
                </select>
            </label>
            <label>
                Ingredients:
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter ingredients"
                    style={{ marginLeft: "8px" }}
                />
            </label>
        
            <button onClick={hanldSearch}>Search</button>
          </div>

          {hasSearched && !loading && results.length===0 && (
            <p>No recipes found.</p>
          )}

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