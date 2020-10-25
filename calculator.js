module.exports = (wcObj) => {

  switch (wcObj.wc) {
    case "MAT":
      return ([{
        desc: "MAT",
        setupTime: (120 * wcObj.setupQty + 5*60)/ 3600,
        prodTime: 0.001,
        note: `${wcObj.note} ${wcObj.setupQty} line items.`
      }])
  }

}
