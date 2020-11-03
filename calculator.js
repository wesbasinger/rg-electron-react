// receives excel values and returns a routing object

module.exports = (vals) => {

  const rtgSteps = [];

  const totalComponents = vals.smtComponents + vals.ssldrSideOneComponents +
                          vals.ssldrSideTwoComponents + vals.stuffComponents +
                          vals.hsldrComponents + vals.mechComponents;

  rtgSteps.push({
    desc: "MAT",
    setupTime: (120*totalComponents + 5*60)/3600,
    prodTime: 0.001,
    note: `${totalComponents} line items`
  })

  let washTime = 8*60; // assume minumum of 8 minutes per wash cycle

  if(vals.washSMTSideOne === "YES" || vals.washSMTSideTwo === "YES" ||
     vals.washSsldrSideOne === "YES" || vals.washSsldrSideTwo === "YES" ||
      vals.washFlowCycle === "YES" || vals.washHsldrCycle === "YES") {

        const totalPanels = Math.ceil(vals.releaseSize/vals.boardPerPanel);

        if(totalPanels > 5) {
          washTime += 12*totalPanels;
        }
  }

  if(vals.smtComponents > 0) {
    const smtSetupTime = vals.smtSetupMinComp*vals.smtComponents;
    let sideOneMaxPlacements = vals.smtSideOnePlacements*vals.boardPerPanel*80;
    if(sideOneMaxPlacements > 40000) {
      sideOneMaxPlacements = 40000;
    }
    const sideOneOp = {
      desc: "SMT",
      setupTime: smtSetupTime/60,
      prodTime: vals.smtSideOnePlacements/sideOneMaxPlacements,
      note: `${vals.smtComponents} unique components ${vals.smtSideOnePlacements} placements. Assume ${sideOneMaxPlacements} max placements per hour.`
    }

    rtgSteps.push(sideOneOp);

    const aoiBoardsPerHour = excelValues.aoiInspPanelsPerHour*excelValues.boardPerPanel
    const aoiHoursPerBoard = 1 / aoiBoardsPerHour;

    rtgSteps.push({
      desc: "AOI",
      setupTime: 0,
      prodTime: aoiHoursPerBoard,
      note: `Assuming ${aoiHoursPerBoard} AOI hours per board.`
    });

    if(vals.washSMTSideOne === "YES") {
      rtgSteps.push({
        desc: "WASH",
        setupTime: 0,
        prodTime: (washTime/vals.releaseSize)/3600,
        note: ""
      })
    }

    if(vals.smtSideOnePlacements > 0) {
      let sideTwoMaxPlacements = vals.smtSideTwoPlacements*vals.boardPerPanel*80;
      if(sideTwoMaxPlacements > 40000) {
        sideTwoMaxPlacements = 40000;
      }
      rtgSteps.push({
        desc: "SMT",
        setupTime: 0,
        prodTime: vals.smtSideTwoPlacements/sideTwoMaxPlacements,
        note: `${vals.smtSideTwoPlacements} placements. Assume ${sideTwoMaxPlacements} max placements per hour.`
      });

      rtgSteps.push({
        desc: "AOI",
        setupTime: 0,
        prodTime: aoiHoursPerBoard,
        note: `Assuming ${aoiHoursPerBoard} AOI hours per board.`
      });

      if(vals.washSMTSideTwo === "YES") {
        rtgSteps.push({
          desc: "WASH",
          setupTime: 0,
          prodTime: (washTime/vals.releaseSize)/3600,
          note: ""
        })
      }

    }

  }

  if(vals.maskAreas > 0) {
    rtgSteps.push({
      desc: "MASK",
      setupTime: 0,
      prodTime: vals.maskAreas*15/3600,
      note: `${vals.maskAreas} mask areas`
    })
  }

  return rtgSteps;

  //
  //   case "SSLDR":
  //     return([{
  //       desc: "SSLDR",
  //       setupTime: 0,
  //       prodTime: (wcObj.prodQty*excelValues.ssldrSecJoint) / 3600,
  //       note: ""
  //     }])
  //   case "PREP":
  //     return([{
  //       desc: "PREP",
  //       setupTime: 0,
  //       prodTime: (wcObj.prodQty*10)/3600, // default of 10 cents per lead
  //       note: `${wcObj.prodQty} total leads to be prepped`
  //     }])
  //   case "STUFF":
  //
  //     return([{
  //       desc: "STUFF",
  //       setupTime: 0,
  //       prodTime: (wcObj.prodQty*10)/3600, // default of 10 cents per location
  //       note: `${wcObj.prodQty} total placements`
  //     }])
  //   case "FLOW":
  //
  //     const flowBoardsPerHour = excelValues.flowPanelsPerHour*excelValues.boardPerPanel
  //     const flowHoursPerBoard = 1 / flowBoardsPerHour;
  //
  //     return([
  //       {
  //         desc: "FLOW",
  //         setupTime: 0,
  //         prodTime: flowHoursPerBoard,
  //         note: `Assuming ${flowBoardsPerHour} boards per hour.`
  //       },
  //       {
  //         desc: "IPQC",
  //         setupTime: 0,
  //         prodTime: (excelValues.stuffPlacements*3)/3600, // assuming 3 seconds insp per placements
  //         note: `${excelValues.stuffComponents} placements to inspect`
  //       }
  //     ])
  //

  //
  //   case "TRIM":
  //     return([{
  //       desc: "TRIM",
  //       setupTime: 0,
  //       prodTime: (wcObj.prodQty/2.5)/3600,
  //       note: `${wcObj.prodQty} leads to trim`
  //     }])
  //
  //   case "HSLDR":
  //     return ([{
  //       desc: "HSLDR",
  //       setupTime: 0,
  //       prodTime: (wcObj.prodQty*10)/3600, // assume 10 minutes per joint
  //       note: `${wcObj.prodQty} joints to solder`
  //     }])
  //
  //   case "TEST":
  //     return([{
  //       desc: "TEST",
  //       setupTime: 0,
  //       prodTime: (wcObj.prodQty) / 60,
  //       note: `${wcObj.prodQty} minutes of test`
  //     }])
  //
  //   case "SHEAR":
  //     return([{
  //       desc: "SHEAR",
  //       setupTime: 0,
  //       prodTime: 5/3600,
  //       note: "Assume 5 seconds per assembly"
  //     }])
  //
  //   case "COAT":
  //     return([{
  //       desc: "COAT",
  //       setupTime: 0,
  //       prodTime: (excelValues.coatHandleSecPerBoard
  //                 + excelValues.coatTimeSecPerSqInch*excelValues.sqInchPerBoard) / 3600,
  //       note: `${(excelValues.coatHandleSecPerBoard
  //                 + excelValues.coatTimeSecPerSqInch*excelValues.sqInchPerBoard)/60} minutes per board`
  //     }])
  //
  //   case "MECH":
  //     return([{
  //       desc: "MECH",
  //       setupTime: 0,
  //       prodTime: (wcObj.prodQty)/60,
  //       note: `${wcObj.prodQty} minutes per assembly`
  //     }])
  //
  //   case "FINAL":
  //
  //     const totalComponents = excelValues.smtComponents + excelValues.ssldrComponents +
  //                             excelValues.stuffComponents + excelValues.hsldrComponents + excelValues.mechComponents;
  //     return([{
  //       desc: "FINAL",
  //       setupTime: 0,
  //       prodTime: (totalComponents*0.4)/3600,
  //       note: `${totalComponents} components to inspect`
  //     }])
  //
  //   case "PACK":
  //
  //     return([{
  //       desc: "PACK",
  //       setupTime: 0,
  //       prodTime: 30/3600,
  //       note: "Standard 30 seconds per unit"
  //     }])
  // }

}
