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
        <PageContainer>
            <RecommendationSlider />

            <SearchSection>
                <Title>QuickCook Recipes</Title>
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
                    <NoResult><strong>No recipes found.</strong></NoResult>
                )}

                <RecipeList>
                    {results.map((r) => (
                    <RecipeItem key={r.id}>
                        <RecipeCard recipe={r} />
                    </RecipeItem>
                    ))}
                </RecipeList>
            </SearchSection>
            </PageContainer>
    )
}


const PageContainer = styled.div`
  padding: 60px;
  font-family: 'Helvetica Neue', sans-serif;
`;

const Title = styled.h4`
  font-size: 1.6rem;
  color:rgb(21, 52, 96);
  margin-bottom: 20px;
`;


const SearchSection = styled.div`
  margin-top: 40px;
  padding-left: 40px; 
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
  background-color: rgb(21, 52, 96);
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(73, 86, 94);
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
  font-size: 2.2rem;
`;

export default RecipeSearch