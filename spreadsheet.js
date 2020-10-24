const ExcelJS = require('exceljs');

const extractValues = async (fileString) => {
  // read from a file
  const wb = new ExcelJS.Workbook();
  const ss = await wb.xlsx.readFile(fileString);

  const ws = ss.getWorksheet('Sheet1');

  return {

    // relevant WC data
    boardPerPanel: Number(ws.getCell('V11').text),
    smtSetupMinComp: Number(ws.getCell('V13').text),
    aoiInspPanelsPerHour: Number(ws.getCell('V14').text),
    ssldrSecJoint: Number(ws.getCell('V16').text),
    flowPanelsPerHour: Number(ws.getCell('V17').text),
    coatTimeSecPerSqInch: Number(ws.getCell('AA13').text),
    sqInchPerBoard: Number(ws.getCell('AA14').text),
    coatHandleSecPerBoard: Number(ws.getCell('AA15')),

    // quote specific parameters
    smtComponents: Number(ws.getCell('B18').text),
    smtPlacements: Number(ws.getCell('C19').text),
    maskAreas: Number(ws.getCell('C21').text),
    ssldrComponents: Number(ws.getCell('B22').text),
    ssldrJoints: Number(ws.getCell('C22').text),
    prepLeads: Number(ws.getCell('C23').text),
    stuffComponents: Number(ws.getCell('B24').text),
    stuffPlacements: Number(ws.getCell('C24').text),
    flowCycle: ws.getCell('C26').text,
    washCycles: Number(ws.getCell('C27').text),
    trimLeads: Number(ws.getCell('C28').text),
    hsldrComponents: Number(ws.getCell('B29').text),
    hsldrLeads: Number(ws.getCell('C29').text),
    pgrmAndTestMinutes: Number(ws.getCell('C31').text),
    depanelize: ws.getCell('C32').text,
    coating: ws.getCell('C33').text,
    mechComponents: Number(ws.getCell('B34').text),
    mechMinutes: Number(ws.getCell('C34').text),
    packingCost: Number(ws.getCell('D36').text),

    releaseSize: Number(ws.getCell('E16'))

  }

}

exports.extractValues = extractValues;
