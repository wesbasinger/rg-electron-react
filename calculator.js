modules.exports = (wcObj) => {

  switch wcObj.desc:
    case "MAT":
      return {
        desc: "MAT",
        setupTime: (120 * wcObj.setupQty + 5*60)/ 60,
        prodTime: 0.001
      }

}
