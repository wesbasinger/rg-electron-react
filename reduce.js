/*
SAMPLE EXCEL Values
{
  "aoiInspPanelsPerHour":20,
  "boardPerPanel":2,
  "coatHandleSecPerBoard":20,
  "coatTimeSecPerSqInch":3,
  "coating":"NO",
  "depanelize":"NO",
  "flowCycle":"YES",
  "flowPanelsPerHour":40,
  "hsldrComponents":5, CHECK
  "hsldrLeads":34,
  "maskAreas":12,
  "mechComponents":1, CHECK
  "mechMinutes":0,
  "packingCost":0.5,
  "pgrmAndTestMinutes":5,
  "prepLeads":13,
  "releaseSize":10,
  "smtComponents":10, CHECK
  "smtPlacements":100,
  "smtSetupMinComp":4,
  "sqInchPerBoard":20,
  "ssldrComponents":20, CHECK
  "ssldrJoints":40,
  "ssldrSecJoint":2,
  "stuffComponents":15, CHECK
  "stuffPlacements":43,
  "trimLeads":200,
  "washCycles":1
}
*/

// all time considered as seconds
// each work center is associated with a length 2 array [setup qty, production qty]
export default (values) => {

  return  {
    "MAT" : {
      "setup": values.hsldrComponents +
             values.mechComponents +
             values.smtComponents +
             values.ssldrComponents +
             values.stuffComponents,
      "prod": 0
    },
    "SMT" : {
        "setup" : values.smtComponents,
        "prod" : values.smtPlacements
    },
    "MASK" : {
      "setup" : 0,
      "prod" : values.maskAreas
    },
    "SSLDR" : {
      "setup" : 0,
      "prod" : values.ssldrJoints
    },
    "FLOW" : {
      "setup" : 0,
      "prod" : values.flowCycle === "YES" ? 1 : 0
    },
    "WASH" : {
      "setup": 0,
      "prod" : values.washCycles
    },
    "TRIM" : {
      "setup" : 0,
      "prod" : values.trimLeads
    },
    "HSLDR" : {
      "setup" : 0,
      "prod" : values.hsldrLeads
    },
    "CABLE" : {
      "setup" : 0,
      "prod" : 0 // TODO: GO BACK AND READ THIS IN AS A VALUE
    },
    "TEST" : {
      "setup" : 0,
      "prod" : values.pgrmAndTestMinutes
    },
    "SHEAR" : {
      "setup" : 0,
      "prod" : values.depanelize === "YES" ? 1 : 0
    },
    "COAT" : {
      "setup" : 0,
      "prod" : values.coating === "YES" ? 1 : 0
    },
    "MECH" : {
      "setup" : 0,
      "prod" : values.mechMinutes
    },
    "PACK" : {
      "setup" : 0,
      "prod" : values.packingCost > 0 ? 1 : 0
    }
  }
}
