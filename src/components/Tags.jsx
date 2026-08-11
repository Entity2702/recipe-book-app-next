function Tag( {color, tag, className} ) {

 const colorStyles = {
  red: 'text-red border-red',
  green: 'text-dark-green border-dark-green',
  orange: 'text-dark-orange border-dark-orange',
  blue: 'text-blue border-blue'
 }

 const style = colorStyles[color] || colorStyles["orange"];

 return(
  <div className={`inline-block px-2.5 py-0.5 ${style} rounded-box border text-[16px] ${className} whitespace-nowrap`}>{tag}</div>
 )

};

export default Tag;