export const addComma = (value) => {
  return value
    .toString()
    .replaceAll(",", "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getNumberIntervals = (rangeList = []) => {
  rangeList.sort((a, b) => a[0] - b[0]);

  const overlap = [];
  const merged = [];
  let prev = rangeList[0];

  for (let i = 1; i < rangeList.length; i++) {
    const curr = rangeList[i];

    // overlap
    if (curr[0] <= prev[1]) {
      const startOverlap = Math.max(prev[0], curr[0]);
      const endOverlap = Math.min(prev[1], curr[1]);
      overlap.push([startOverlap, endOverlap]);

      prev = [prev[0], Math.max(prev[1], curr[1])];
    } else {
      merged.push(prev);
      prev = curr;
    }
  }
  merged.push(prev);

  const notInclude = [];
  let start = 0;

  for (const [low, high] of merged) {
    if (start < low) {
      notInclude.push([start, low - 1]);
    }
    start = high + 1;
  }

  if (start <= 20) {
    notInclude.push([start, 20]);
  }

  return { overlap, notInclude };
};
