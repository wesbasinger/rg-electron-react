// take an array of work centers, find the one with matching Description
// and decrement the prod and setup qty by given ammount

// reduce array is from reduce.js and wcObj is from the state of the TransitionScreen component

const subtract = (reduceArr, wcObj) => {
  const resultArr = [];
  reduceArr.forEach((wc) => {
    if(wc.desc !== wcObj.wc) {
      resultArr.push(wc);
    } else {
      console.log("Found it!")
      resultArr.push({
        "desc" : wc.desc,
        "setupQty" : wc.setupQty - wcObj.setupQty,
        "prodQty" : wc.prodQty - wcObj.prodQty
      })
    }
  })
  return resultArr;
}

module.exports.subtract = subtract
