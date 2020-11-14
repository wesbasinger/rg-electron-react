// takes releaseSize and rtgSteps and returns full routing
module.exports = (releaseSize, rtgSteps) => {

  const result = [];

  rtgSteps.forEach((item, i) => {
    result.push({
      seq: i*10 + 10,
      desc: item.desc,
      setupTime: Math.round(item.setupTime * 1000) / 1000,
      prodTime: Math.round(item.prodTime * 1000) / 1000,
      totalTime: Math.round(item.setupTime + item.prodTime*releaseSize * 1000) / 1000,
      note: item.note
    })
  });

  return result;

}
