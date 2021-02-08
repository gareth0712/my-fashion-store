let hrstart;

const start = () => {
  hrstart = process.hrtime();
};

const showPerformanceData = () => {
  const hrend = process.hrtime(hrstart);
  const processedTime = `Processed time: ${hrend[0]}s, ${hrend[1] / 1000000}ms`;
  const usedMem = `Used Mem: ${
    Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100
  } MB`;
  return `${processedTime}; ${usedMem}`;
};

module.exports = {
  start,
  showPerformanceData,
};
