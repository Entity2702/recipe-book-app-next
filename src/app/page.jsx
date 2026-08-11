'use client'

import Card from "../components/Card";
import Difficulty from "../components/Difficulty";
import LoadMore from "../components/LoadMore";
import Searchbar from "../components/Searchbar";
import { useGetRecipesQuery } from "./api/RecipesAPI";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AllRecipes(){
 const [skip, setSkip] = useState(0);
 const [limit, setLimit] = useState(6);
 const [search, setSearch] = useState('');
 const [selectedDifficulty, setSelectedDifficulty] = useState('All');
 const [recipes, setRecipes] = useState([]);

 const handleLoadMore = () => {
  if(recipes.total <= limit) alert("All recipes are shown!");
  setSkip((prevSkip) => prevSkip + limit);
 };
 
 const handleSearch = (userSearch) => {
  setSearch(userSearch);
  setSkip(0);
 }
 
 useEffect(() => {
  setRecipes([]);
 }, [search]);

 const {data: newRecipesData, error: error, isFetching: isFetching } = useGetRecipesQuery({search: search, limit: limit, skip: skip});

 const newRecipes = newRecipesData?.recipes;

 useEffect(() => {
  if(newRecipes && newRecipes.length > 0) setRecipes((oldRecipes) => [...oldRecipes, ...newRecipes])
 }, [newRecipes]);

 const filteredRecipes = selectedDifficulty === 'All' ? recipes : recipes?.filter((recipe) => recipe.difficulty === selectedDifficulty);

 const handleDifficulty = (difficulty) => {
  setSelectedDifficulty(difficulty);
 }

 return(
  <>
  <header className="relative w-full h-40 figma-0:h-84 flex items-center justify-center overflow-hidden border border-black mb-10 figma-0:mb-15">
   <Image src={"/bgimage.png"} alt="background image" className="object-cover" fill />
   <div className="relative z-10 flex items-center justify-center w-full">
    <div className="border-[1.5px] border-white flex-1 rounded-r-full"/>
    <Image src={"logo.svg"} alt="Recipe Book" width={287} height={72} className="w-71.75 h-18 figma-0:w-121.5 figma-0:h-36" />
    <div className="border-[1.5px] border-white flex-1 rounded-l-full"/>
   </div>
  </header>

  <main className="flex flex-col items-center gap-10">
   <div className="flex flex-col figma-0:flex-row figma-0:justify-between items-center figma-0:w-full px-12.5">
    <Searchbar className={"mb-10 figma-0:mb-0 figma-0:left-12.5"} onSearch={handleSearch}/>

    <div className="flex flex-col figma-0:flex-row gap-2.5 figma-0:gap-5">
     <Difficulty difficulty={'All'} size={'large'} type={selectedDifficulty === 'All' ? 'filled' : 'outlined'} onClick={() => handleDifficulty('All')} />

     <div className="flex gap-[11.5px] figma-0:gap-5 mt-2.5 figma-0:mt-0">
     <Difficulty difficulty={'Easy'} size={'large'} type={selectedDifficulty === 'Easy' ? 'filled' : 'outlined'} onClick={() => handleDifficulty('Easy')} />
     <Difficulty difficulty={'Medium'} size={'large'} type={selectedDifficulty === 'Medium' ? 'filled' : 'outlined'} onClick={() => handleDifficulty('Medium')} />
     <Difficulty difficulty={'Hard'} size={'large'} type={selectedDifficulty === 'Hard' ? 'filled' : 'outlined'} onClick={() => handleDifficulty('Hard')} />
     </div>
    </div>
   </div>
   
   <div className="grid grid-cols-1 figma-0:grid-cols-[repeat(2,420px)] figma-1:grid-cols-[repeat(3,420px)] figma-2:grid-cols-[repeat(4,420px)] figma-3:grid-cols-[repeat(5,420px)] gap-y-12.5 figma-0:gap-5 figma-0:justify-between figma-0:w-full px-12.5">
    {
     
     filteredRecipes?.map((recipe) => <Card key={recipe.id} id={recipe.id} name={recipe.name} time={recipe.prepTimeMinutes + recipe.cookTimeMinutes} difficulty={recipe.difficulty} cuisine={recipe.cuisine} tags={recipe.tags} image={recipe.image} />)
    }
   </div>
   {isFetching && <p className="text-center mt-4">Loading more recipes...</p>}
   {error && <p className="text-center mt-4 text-red-500">Recipes failed to load</p>}
  </main>

  <footer className="flex justify-center my-12.5 figma-0:my-25">
   <LoadMore onClick={handleLoadMore}/>
  </footer>
  </>
 )
}