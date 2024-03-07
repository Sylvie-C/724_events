export const MONTHS = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre",
"octobre","novembre","décembre"];

// export const getMonth = (date) => MONTHS[date.getMonth()];
export const getMonthString = (date) => { 
  /*
    Function to convert a JS Date type variable into the corresponding month.  
    Parameters : 1 -> date (Date type JS object)
    Return : corresponding month (string type).
  */
  const data = date.getMonth() // method Date.getMonth() 
  return MONTHS[data] ; 
} 

export const extractLetters = (inputString) => {
  /*
    Function to extract letters from a string. 
    Parameters : 1 -> string
    Return : new string with only letters (lower and upper case)
  */
    const regex = /[a-zA-ZÀ-ÖØ-öø-ÿ]+/g;
    const lettersArray = inputString.match(regex);
    const extractedLetters = lettersArray ? lettersArray.join('') : '';
    return extractedLetters;
}
