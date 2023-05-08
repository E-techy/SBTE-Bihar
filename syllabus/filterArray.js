

function filterArray(array,query) {
  let queryArray=splitWords(query);
  let result=[];
  for (let i = 0; i < array.length; i++) {
    let curElement = array[i].toLowerCase();
    let wordsMatched=0;

    for (let j = 0; j < queryArray.length; j++) {
        let element = queryArray[j];
        if (curElement.includes(element)) {
            wordsMatched++;
        }
    }
    result.push([wordsMatched,curElement]);
    
  }
  sortArray(result);
  console.log(result);
//   return removeUnwantedElementsFromArray(result);
}

function splitWords(string) {
    string.trim();
    return string.toLowerCase().split(" ");
}

function sortArray(array) {
    return array.sort((a,b)=>b[0]-a[0]);
}

function removeUnwantedElementsFromArray(array) {
    let result=[];
    for (let i = 0; i < array.length; i++) {
        result.push(array[i][1]);
        
    }
    return result;
}

export {filterArray};