import fs from "fs";

let input = fs.readFileSync("./input.txt", "utf8");

const extractBoundsFromPair = (pair) => {
  const [pairOne, pairTwo] = pair.split(",");
  let [pairOneLowerBound, pairOneUpperBound] = pairOne.split("-");
  let [pairTwoLowerBound, pairTwoUpperBound] = pairTwo.split("-");

  return [
    parseInt(pairOneLowerBound),
    parseInt(pairOneUpperBound),
    parseInt(pairTwoLowerBound),
    parseInt(pairTwoUpperBound),
  ];
};

const isFullOverlap = (
  pairOneLowerBound,
  pairOneUpperBound,
  pairTwoLowerBound,
  pairTwoUpperBound
) => {
  if (
    pairOneLowerBound <= pairTwoLowerBound &&
    pairOneUpperBound >= pairTwoUpperBound
  ) {
    return true;
  }

  if (
    pairTwoLowerBound <= pairOneLowerBound &&
    pairTwoUpperBound >= pairOneUpperBound
  ) {
    return true;
  }

  return false;
};

const isSomeOverlap = (
  pairOneLowerBound,
  pairOneUpperBound,
  pairTwoLowerBound,
  pairTwoUpperBound
) => {
  if (
    pairOneUpperBound >= pairTwoLowerBound &&
    pairOneUpperBound <= pairTwoUpperBound
  ) {
    return true;
  }

  if (
    pairTwoUpperBound >= pairOneLowerBound &&
    pairTwoUpperBound <= pairOneUpperBound
  ) {
    return true;
  }

  return false;
};

const getNumberOfPairsWhereOneFullyContainsOther = (input) => {
  const allSectorPairs = input.split("\n");

  let numberOfPairsWhereOneFullyContainsOther = 0;

  allSectorPairs.forEach((pair) => {
    if (isFullOverlap(...extractBoundsFromPair(pair))) {
      numberOfPairsWhereOneFullyContainsOther++;
    }
  });

  return numberOfPairsWhereOneFullyContainsOther;
};

const getNumberOfPairsWhereSomeOverlapExists = (input) => {
  const allSectorPairs = input.split("\n");

  let numberOfPairsWhereSomeOverlapExists = 0;

  allSectorPairs.forEach((pair) => {
    if (isSomeOverlap(...extractBoundsFromPair(pair))) {
      numberOfPairsWhereSomeOverlapExists++;
    }
  });

  return numberOfPairsWhereSomeOverlapExists;
};

console.log(
  "Part 1 answer: " + getNumberOfPairsWhereOneFullyContainsOther(input)
);

console.log("Part 2 answer: " + getNumberOfPairsWhereSomeOverlapExists(input));
