module.exports = (rtg) => {
  let result = "Seq, Work Center, Setup Time,  Prod Time, Total Time, Note\n";
  rtg.forEach((step) => {
    result += `${step.seq}, ${step.desc}, ${step.setupTime}, ${step.prodTime}, ${step.totalTime}, ${step.note}\n`;
  });
  return result;
}
