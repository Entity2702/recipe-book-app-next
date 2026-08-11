'use client'

import Card from "../components/Card";
import Difficulty from "../components/Difficulty";
import LoadMore from "../components/LoadMore";
import Searchbar from "../components/Searchbar";
import { useGetRecipesQuery, useSearchRecipesQuery } from "./api/RecipesAPI";
import { useState } from "react";
import Image from "next/image";

export default function AllRecipes(){
 const [limit, setLimit] = useState(6);
 const [search, setSearch] = useState('');
 const [selectedDifficulty, setSelectedDifficulty] = useState('All');

 const handleLoadMore = () => {
  if(recipes.total <= limit) alert("All recipes are shown!");
  setLimit((prevLimit) => prevLimit + 6);
 };
 
 const handleSearch = (userSearch) => {
  setSearch(userSearch);
  setLimit(6);
 }
 
const {data: recipesLimit, error: errorLimit, isFetching: isFetchingLimit } = useGetRecipesQuery({limit: limit, skip: 0}, {skip: search !== ''});

const {data: recipesSearch, error: errorSearch, isFetching: isFetchingSearch } = useSearchRecipesQuery({search: search, limit: limit}, {skip: search === ''});

 const recipes = search !== '' ? recipesSearch : recipesLimit;
 const error = search !== '' ? errorSearch : errorLimit;
 const isFetching = search !== '' ? isFetchingSearch : isFetchingLimit;

 const filteredRecipes = selectedDifficulty === 'All' ? recipes?.recipes : recipes?.recipes.filter((recipe) => recipe.difficulty === selectedDifficulty);

 const handleDifficulty = (difficulty) => {
  setSelectedDifficulty(difficulty);
 }

 return(
  <>
  <header className="relative w-full h-40 figma:h-84 flex items-center justify-center overflow-hidden border border-black mb-10 figma:mb-15">
   <Image src={"/bgimage.png"} alt="background image" className="object-cover" fill />
   <div className="relative z-10 flex items-center justify-center w-full">
    <div className="border-[1.5px] border-white flex-1 rounded-r-full"/>
    <Image src={"logo.svg"} alt="Recipe Book" width={287} height={72} className="w-71.75 h-18 figma:w-121.5 figma:h-36" />
    <div className="border-[1.5px] border-white flex-1 rounded-l-full"/>
   </div>
  </header>

  <main className="flex flex-col items-center gap-10">
   <div className="flex flex-col figma:flex-row figma:justify-between items-center figma:w-335">
    <Searchbar className={"mb-10 figma:mb-0 figma:left-12.5"} onSearch={handleSearch}/>

    <div className="flex flex-col figma:flex-row gap-2.5 figma:gap-5">
     <Difficulty difficulty={'All'} size={'large'} type={selectedDifficulty === 'All' ? 'filled' : 'outlined'} onClick={() => handleDifficulty('All')} />

     <div className="flex gap-[11.5px] figma:gap-5 mt-2.5 figma:mt-0">
     <Difficulty difficulty={'Easy'} size={'large'} type={selectedDifficulty === 'Easy' ? 'filled' : 'outlined'} onClick={() => handleDifficulty('Easy')} />
     <Difficulty difficulty={'Medium'} size={'large'} type={selectedDifficulty === 'Medium' ? 'filled' : 'outlined'} onClick={() => handleDifficulty('Medium')} />
     <Difficulty difficulty={'Hard'} size={'large'} type={selectedDifficulty === 'Hard' ? 'filled' : 'outlined'} onClick={() => handleDifficulty('Hard')} />
     </div>
    </div>
   </div>
   
   <div className="grid grid-cols-1 figma:grid-cols-3 gap-y-12.5 figma:gap-x-10 figma:w-335">
    {
     
     filteredRecipes?.map((recipe) => <Card key={recipe.id} id={recipe.id} name={recipe.name} time={recipe.prepTimeMinutes + recipe.cookTimeMinutes} difficulty={recipe.difficulty} cuisine={recipe.cuisine} tags={recipe.tags} image={recipe.image} />)
    }
   </div>
   {isFetching && <p className="text-center mt-4">Loading more recipes...</p>}
   {error && <p className="text-center mt-4 text-red-500">Recipes failed to load</p>}
  </main>

  <footer className="flex justify-center my-12.5 figma:my-25">
   <LoadMore onClick={handleLoadMore}/>
  </footer>
  </>
 )
}