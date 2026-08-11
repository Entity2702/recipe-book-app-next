import { useRef } from "react";
import Image from "next/image";

function Searchbar({className, onSearch}){
 const input = useRef(null);

 const handleSearch = () => {
  const userSearch = input.current.value;
   onSearch(userSearch);
 }

 const onTyping = (event) => {
  if(event.key === "Enter") {
   handleSearch();
  }
 }

 return(
  <div className={`flex items-center w-[320px] border rounded-box px-5 py-2 border-black focus-within:shadow-orange-custom ${className}`}>
   <Image src={"/loupe.png"} alt="loupe" width={25} height={25} className="w-6.25 h-6.25" />
   <input type="text" className="w-full pl-2.5 focus:outline-none overflow-hidden whitespace-nowrap" ref={input} onKeyDown={onTyping} onBlur={handleSearch}/>
  </div>
 )
}

export default Searchbar;