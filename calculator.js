module.exports = (wcObj, excelValues) => {

  switch (wcObj.wc) {
    case "MAT":
      return ([{
        desc: "MAT",
        setupTime: (120 * wcObj.setupQty + 5*60)/ 3600,
        prodTime: 0.001,
        note: `${wcObj.setupQty} line items.`
      }])
    case "SMT":
      let maxPlacementsPerHour = excelValues.boardPerPanel*wcObj.prodQty*80;
      if(maxPlacementsPerHour > 40000) {
        maxPlacementsPerHour = 40000;
      }

      const aoiBoardsPerHour = excelValues.aoiInspPanelsPerHour*excelValues.boardPerPanel
      const aoiHoursPerBoard = 1 / aoiBoardsPerHour;

      return(
        [
          {
            desc: "SMT",
            setupTime: (excelValues.smtSetupMinComp*wcObj.setupQty) / 60,
            prodTime: (wcObj.prodQty/maxPlacementsPerHour),
            note: `${wcObj.setupQty} unique components ${wcObj.prodQty} placements. Assume ${maxPlacementsPerHour} max placements per hour.`
          },
          {
            desc: "AOI",
            setupTime: 0,
            prodTime: aoiHoursPerBoard,
            note: `Assuming ${aoiBoardsPerHour} per hour.`
          }
        ]
      )

    case "MASK":
      return([{
        desc: "MASK",
        setupTime: 0,
        prodTime: (excelValues.maskAreas*15)/3600,
        note: `${excelValues.maskAreas} mask areas`
      }])

  }

}
