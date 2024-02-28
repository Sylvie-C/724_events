export const MONTHS = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre",
"octobre","novembre","décembre"];

// export const getMonth = (date) => MONTHS[date.getMonth()];
export const getMonthData = (date) => { 
  /*
    Function to convert a JS Date type variable into the corresponding month.  
    Parameters : 1 -> date (Date type JS object)
    Return : corresponding month (string type).
  */
  const data = date.getMonth() // method Date.getMonth() 
  return MONTHS[data] ; 
} 
