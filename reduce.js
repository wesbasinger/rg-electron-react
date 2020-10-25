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

module.exports = (values) => {

  return  [
    {
      "desc" : "MAT",
      "setupQty": values.hsldrComponents +
             values.mechComponents +
             values.smtComponents +
             values.ssldrComponents +
             values.stuffComponents,
      "prodQty": 0
    },
    {
        "desc": "SMT",
        "setupQty" : values.smtComponents,
        "prodQty" : values.smtPlacements
    },
    {
      "desc" : "MASK",
      "setupQty" : 0,
      "prodQty" : values.maskAreas
    },
    {
      "desc" : "SSLDR",
      "setupQty" : 0,
      "prodQty" : values.ssldrJoints
    },
    {
      "desc" : "FLOW",
      "setupQty" : 0,
      "prodQty" : values.flowCycle === "YES" ? 1 : 0
    },
    {
      "desc" : "WASH",
      "setupQty": 0,
      "prodQty" : values.washCycles
    },
    {
      "desc" : "TRIM",
      "setupQty" : 0,
      "prodQty" : values.trimLeads
    },
    {
      "desc" : "HSLDR",
      "setupQty" : 0,
      "prodQty" : values.hsldrLeads
    },
    {
      "desc" : "CABLE",
      "setupQty" : 0,
      "prodQty" : 0 // TODO: GO BACK AND READ THIS IN AS A VALUE
    },
    {
      "desc" : "TEST",
      "setupQty" : 0,
      "prodQty" : values.pgrmAndTestMinutes
    },
    {
      "desc" : "SHEAR",
      "setupQty" : 0,
      "prodQty" : values.depanelize === "YES" ? 1 : 0
    },
    {
      "desc" : "COAT",
      "setupQty" : 0,
      "prodQty" : values.coating === "YES" ? 1 : 0
    },
    {
      "desc" : "PACK",
      "setupQty" : 0,
      "prodQty" : values.packingCost > 0 ? 1 : 0
    },
    {
      "desc" : "PREP",
      "setupQty" : 0,
      "prodQty" : values.prepLeads
    },
    {
      "desc" : "STUFF",
      "setupQty" : 0,
      "prodQty" : values.stuffPlacements
    },
    {
      "desc" : "MECH",
      "setupQty" : 0,
      "prodQty" : values.mechMinutes
    },
    {
      "desc" : "FINAL",
      "setupQty" : 0,
      "prodQty" : 1
    }
  ]
}
