const ExcelJS = require('exceljs');

const extractValues = async (fileString) => {
  // read from a file
  const wb = new ExcelJS.Workbook();
  const ss = await wb.xlsx.readFile(fileString);

  const ws = ss.getWorksheet('Sheet1');

  return {

    // relevant WC data
    boardPerPanel: Number(ws.getCell('W12').text),
    smtSetupMinComp: Number(ws.getCell('W14').text),
    aoiInspPanelsPerHour: Number(ws.getCell('W15').text),
    ssldrSecJoint: Number(ws.getCell('W17').text),
    flowPanelsPerHour: Number(ws.getCell('W18').text),
    coatTimeSecPerSqInch: Number(ws.getCell('AB14').text),
    sqInchPerBoard: Number(ws.getCell('AB15').text),
    coatHandleSecPerBoard: Number(ws.getCell('AB16')),

    // quote specific parameters
    smtComponents: Number(ws.getCell('B18').text),
    smtSideOnePlacements: Number(ws.getCell('C19').text),
    washSMTSideOne: ws.getCell('D19').text,
    smtSideTwoPlacements: Number(ws.getCell('C20').text),
    washSMTSideTwo: ws.getCell('D20').text,
    maskAreas: Number(ws.getCell('C22').text),
    ssldrSideOneComponents: Number(ws.getCell('B23').text),
    ssldrSideOneJoints: Number(ws.getCell('C23').text),
    washSsldrSideOne: ws.getCell('D23').text,
    ssldrSideTwoComponents: Number(ws.getCell('B24').text),
    ssldrSideTwoJoints: Number(ws.getCell('C24').text),
    washSsldrSideTwo: ws.getCell('D24').text,
    prepLeads: Number(ws.getCell('C25').text),
    stuffComponents: Number(ws.getCell('B26').text),
    stuffPlacements: Number(ws.getCell('C26').text),
    flowCycle: ws.getCell('C28').text,
    washFlowCycle: ws.getCell('D28').text,
    trimLeads: Number(ws.getCell('C30').text),
    hsldrComponents: Number(ws.getCell('B31').text),
    hsldrLeads: Number(ws.getCell('C31').text),
    washHsldrCycle: ws.getCell('D31').text,
    cableMinutes: Number(ws.getCell('C32').text),
    pgrmAndTestMinutes: Number(ws.getCell('C33').text),
    depanelize: ws.getCell('C34').text,
    coating: ws.getCell('C35').text,
    mechComponents: Number(ws.getCell('B36').text),
    mechMinutes: Number(ws.getCell('C36').text),
    packingCost: Number(ws.getCell('E38').text),

    releaseSize: Number(ws.getCell('F16'))

  }

}

exports.extractValues = extractValues;
