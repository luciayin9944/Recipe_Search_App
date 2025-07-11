import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecommendationSlider from "../components/RecommendationSlider";
import styled from "styled-components";

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
            console.log(data)
        } catch (error) {
            console.error(error);
            alert("Fetch data failed")
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <RecommendationSlider />
            <h2>Quick-Cook Recipes</h2>

            <SearchBar>
                <Label>
                Max Time:
                <Select
                    value={maxTime}
                    onChange={(e) => setMaxTIme(Number(e.target.value))}
                >
                    <option value={30}>30 min</option>
                    <option value={20}>20 min</option>
                    <option value={10}>10 min</option>
                </Select>
                </Label>

                <Label>
                Ingredients:
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter ingredients"
                />
                </Label>

                <Button onClick={hanldSearch}>Search</Button>
            </SearchBar>

            {hasSearched && !loading && results.length === 0 && (
                <NoResult>No recipes found.</NoResult>
            )}

            <RecipeList>
                {results.map((r) => (
                <RecipeItem key={r.id}>
                    <RecipeCard recipe={r} />
                </RecipeItem>
                ))}
            </RecipeList>
            </>
    )
}


const SliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 6px;
  border-radius: 6px;
`;

const Input = styled.input`
  padding: 6px;
  border-radius: 6px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  background-color: #0077cc;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

const RecipeList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const RecipeItem = styled.li`
  flex: 0 0 220px;
  margin: 8px;
`;

const NoResult = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
`;

export default RecipeSearch