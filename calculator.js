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
        prodTime: (wcObj.prodQty*15)/3600, //default of 15 cent per area
        note: `${wcObj.prodQty} mask areas`
      }])

    case "SSLDR":
      return([{
        desc: "SSLDR",
        setupTime: 0,
        prodTime: (wcObj.prodQty*excelValues.ssldrSecJoint) / 3600,
        note: ""
      }])
    case "PREP":
      return([{
        desc: "PREP",
        setupTime: 0,
        prodTime: (wcObj.prodQty*10)/3600, // default of 10 cents per lead
        note: `${wcObj.prodQty} total leads to be prepped`
      }])
    case "STUFF":

      return([{
        desc: "STUFF",
        setupTime: 0,
        prodTime: (wcObj.prodQty*10)/3600, // default of 10 cents per location
        note: `${wcObj.prodQty} total placements`
      }])
    case "FLOW":

      const flowBoardsPerHour = excelValues.flowPanelsPerHour*excelValues.boardPerPanel
      const flowHoursPerBoard = 1 / flowBoardsPerHour;

      return([
        {
          desc: "FLOW",
          setupTime: 0,
          prodTime: flowHoursPerBoard,
          note: `Assuming ${flowBoardsPerHour} boards per hour.`
        },
        {
          desc: "IPQC",
          setupTime: 0,
          prodTime: (excelValues.stuffPlacements*3)/3600, // assuming 3 seconds insp per placements
          note: `${excelValues.stuffComponents} placements to inspect`
        }
      ])

    case "WASH":
      let washTime = 8*60; // assume minumum of 8 minutes per wash cycle
      const totalPanels = Math.ceil(excelValues.releaseSize/excelValues.boardPerPanel);

      if(totalPanels >= 5) {
        washTime += 12*totalPanels
      }

      return([{
        desc: "WASH",
        setupTime: 0,
        prodTime: (washTime/excelValues.releaseSize)/3600,
        note: ""
      }])

    case "TRIM":
      return([{
        desc: "TRIM",
        setupTime: 0,
        prodTime: (wcObj.prodQty/2.5)/3600,
        note: `${wcObj.prodQty} leads to trim`
      }])
  }

}
