'use client'

import { useGetRecipesByIdQuery } from "@/app/api/RecipesAPI";
import Tag from "@/components/Tags";
import Link from "next/link";
import Difficulty from "@/components/Difficulty";
import Image from "next/image";
import { use } from "react";

export default function SingleRecipe({params}){
 const { id } = use(params);
 const {data: recipe, error, isLoading} = useGetRecipesByIdQuery({id: id});

 if(isLoading) return <p>Recipe is Loading...</p>;
 if(error) return <p>Recipe loading failed</p>;
 
 const time = recipe.cookTimeMinutes + recipe.prepTimeMinutes + ' min';

 return(
  <>
  <header className="px-5 flex items-center mb-7.5 mt-5 figma-1:px-0 figma-1:mt-11.5 figma-1:grid-cols-[1fr_70px_1fr]">
   <div className="flex flex-row items-center w-full">
   <Link href={"/"} className="figma-1:ml-12.5 border font-just-me-again-down-here px-5 rounded-box text-[32px] whitespace-nowrap">Go back</Link>
   <hr className="border w-full ml-8.25 rounded-full"/>
   </div>
   <Image src={"/logoBlack.svg"} alt="Logo black" width={80} height={46} className="w-20 h-[46.34px] pl-5 pr-2.5 figma-1:hidden" />
   <div className="hidden figma-1:flex flex-row items-center shrink-0">
   <Image src={"/logoBlack.svg"} alt="Logo black" width={80} height={80} className="w-20 h-20 ml-5 mr-1.75" />
   <p className="text-[40px] font-just-me-again-down-here whitespace-nowrap mr-6">Recipe Book</p>
   </div>
   <div className="hidden figma-1:block w-full">
   <hr className="border w-fullrounded-l-full" />
   </div>
  </header>

  <main className="flex flex-col items-center px-5 gap-10 figma-1:grid figma-1:grid-cols-2 figma-1:grid-rows-2 figma-1:px-12.5 figma-1:gap-20 mb-5">
   <Image src={recipe.image} alt="Food photo" width={353} height={266}  className="object-cover border figma-1:w-165 figma-1:h-115" />

   <div className="w-88.25 figma-1:w-148.75">
    <div className="flex flow-row items-center gap-2.5">
     {recipe.tags.map((tag, index) => <Tag key={index} color={'orange'} tag={tag} /> )}
    </div>

    <p className="font-just-me-again-down-here text-[48px] mb-7.5 figma-1:text-[80px]">{recipe.name}</p>

    <div className="figma-1:w-100">
     <div className="flex items-center mb-5 figma-1:mb-6.25">
      <Image src={"/level.svg"} alt="level img" width={30} height={30} />
      <p className="text-[20px] ml-2">Level</p>
      <span className="ml-auto"><Difficulty size='small' difficulty={recipe.difficulty} type={'filled'} /></span>
     </div>

     <div className="flex items-center mb-5 figma-1:mb-6.25">
       <Image src={"/servings.svg"} alt="servings img" width={30} height={30} />
       <p className="text-[20px] ml-2">Servings</p>
       <Tag className="ml-auto" color={'orange'} tag={recipe.servings} />
     </div>

     <div className="flex items-center mb-5 figma-1:mb-6.25">
       <Image src={"/cuisine.png"} alt="cuisine img" width={30} height={30} />
       <p className="text-[20px] ml-2">Cuisine</p>
       <Tag className="ml-auto" color={'red'} tag={recipe.cuisine} />
     </div>

     <div className="flex items-center mb-5 figma-1:mb-6.25">
       <Image src={"/cookTime.png"} alt="cook time img" width={30} height={30} />
       <p className="text-[20px] ml-2">Time</p>
       <Tag className="ml-auto" color={'blue'} tag={time} />
     </div>
    </div>
   </div>

   <div className="border rounded-box pt-2.5 pb-10 px-5 w-88.25 figma-1:w-152.5 figma-1:col-start-2 figma-1:self-start">
    <p className="font-just-me-again-down-here text-[40px] mb-3.75 figma-1:mb-6.25">Ingredients</p>
    <ul className="list-disc list-inside text-[20px] flex flex-col gap-2.5">
     {recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
    </ul>
   </div>

   <div className="w-88.25 mb-25 figma-1:w-165 figma-1:col-end-2 figma-1:row-end-3 figma-1:self-start">
    <p className="font-just-me-again-down-here text-[40px] mb-3.75 figma-1:mb-6.25">Instructions</p>
    <ol className="list-decimal list-inside text-[20px] flex flex-col gap-2.5">
     {recipe.instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
    </ol>
   </div>
  </main>
  </>
 )

}