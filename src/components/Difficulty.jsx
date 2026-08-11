function Difficulty({size, difficulty, type, onClick}){
 const sizeStyle = {
  large: 'w-[120px] text-[20px]',
  small: 'inline-block text-[16px]'
 };
 const filledStyle = {
  Easy: 'border-dark-green text-dark-green bg-green-transparent',
  Medium: 'border-dark-orange text-dark-orange bg-orange-transparent',
  Hard: 'border-red text-red bg-red-transparent',
  All: 'border-blue text-blue bg-blue-transparent'
 }

 const outlinedStyle = 'border-black text-black bg-white';

 const style = type === 'filled' ? filledStyle[difficulty] + ' ' + sizeStyle[size] : outlinedStyle + ' ' + sizeStyle[size];

 if(onClick){
  return(
  <button className={`rounded-box border px-5 py-1 ${style}`} onClick={onClick} >{difficulty}</button>
 )
 }
 else {
  return(
  <div className={`rounded-box border px-5 py-1 ${style}`} >{difficulty}</div>
 )
}
}


export default Difficulty;