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

    const aoiBoardsPerHour = vals.aoiInspPanelsPerHour*vals.boardPerPanel
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

  if(vals.ssldrSideOneJoints > 0) {
    rtgSteps.push({
      desc: "SSLDR",
      setupTime: 0,
      prodTime: (vals.ssldrSecJoint*vals.ssldrSideOneJoints)/3600,
      note: ""
    });

    if(vals.washSsldrSideOne === "YES") {
      rtgSteps.push({
        desc: "WASH",
        setupTime: 0,
        prodTime: (washTime/vals.releaseSize)/3600,
        note: ""
      })
    }
  }

  if(vals.ssldrSideTwoJoints > 0) {
    rtgSteps.push({
      desc: "SSLDR",
      setupTime: 0,
      prodTime: (vals.ssldrSecJoint*vals.ssldrSideTwoJoints)/3600,
      note: ""
    });

    if(vals.washSsldrSideOne === "YES") {
      rtgSteps.push({
        desc: "WASH",
        setupTime: 0,
        prodTime: (washTime/vals.releaseSize)/3600,
        note: ""
      })
    }
  }

  if(vals.prepLeads > 0) {
    rtgSteps.push({
      desc: "PREP",
      setupTime: 0,
      prodTime: (vals.prepLeads*10)/3600,
      note: ""
    })
  }

  if(vals.stuffPlacements > 0) {
    rtgSteps.push({
      desc: "STUFF",
      setupTime: 0,
      prodTime: (vals.stuffPlacements*10)/3600,
      note: ""
    })
  }

  if(vals.flowCycle === "YES") {
    const flowBoardsPerHour = vals.flowPanelsPerHour*vals.boardPerPanel;
    const flowHoursPerBoard = 1 / flowBoardsPerHour;

    rtgSteps.push({
      desc: "IPQC",
      setupTime: 0,
      prodTime: (vals.stuffPlacements*3)/3600,
      note: ""
    })

    rtgSteps.push({
      desc: "FLOW",
      setupTime: 0,
      prodTime: flowHoursPerBoard,
      note: `Assume ${flowBoardsPerHour} boards per hour.`
    })

    if(vals.washFlowCycle === "YES") {
      rtgSteps.push({
        desc: "WASH",
        setupTime: 0,
        prodTime: (washTime/vals.releaseSize)/3600,
        note: ""
      })
    }
  }

  if(vals.trimLeads > 0) {
    rtgSteps.push({
      desc: "TRIM",
      setupTime: 0,
      prodTime: (vals.trimLeads/3)*2.5/3600,
      note: ""
    })
  }

  if (vals.hsldrLeads > 0) {
    rtgSteps.push({
      desc: "HSLDR",
      setupTime: 0,
      prodTime: (10*vals.hsldrLeads)/3600,
      note: ""
    })

    if(vals.washHsldrCycle === "YES") {
      rtgSteps.push({
        desc: "WASH",
        setupTime: 0,
        prodTime: (washTime/vals.releaseSize)/3600,
        note: ""
      })
    }
  }

  if(vals.cableMinutes > 0) {
    rtgSteps.push({
      desc: "CABLE",
      setupTime: 0,
      prodTime: (vals.cableMinutes)/60,
      note: `${vals.cableMinutes} minutes per assembly.`
    })
  }

  if(vals.pgrmAndTestMinutes > 0) {
    rtgSteps.push({
      desc: "TEST",
      setupTime: 0,
      prodTime: vals.pgrmAndTestMinutes/60,
      note: ""
    })
  }

  if(vals.depanelize === "YES") {
    rtgSteps.push({
      desc: "SHEAR",
      setupTime: 0,
      prodTime: 5/3600,
      note: ""
    })
  }

  if(vals.coating === "YES") {
    rtgSteps.push({
      desc: "COAT",
      setupTime: 0,
      prodTime: vals.coatTimeSecPerSqInch*vals.sqInchPerBoard + vals.coatHandleSecPerBoard / 3600,
      note: ""
    })
  }

  if(vals.mechMinutes > 0) {
    rtgSteps.push({
      desc: "MECH",
      setupTime: 0,
      prodTime: vals.mechMinutes/3600,
      note: ""
    })
  }

  rtgSteps.push({
    desc: "FINAL",
    setupTime: 0,
    prodTime: (totalComponents*.4)/3600,
    note: ""
  })

  rtgSteps.push({
    desc: "PACK",
    setupTime: 0,
    prodTime: vals.packingCost*100/3600,
    note: ""
  })

  return rtgSteps;

}
