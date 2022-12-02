import fs from "fs";

let input = fs.readFileSync("./input.txt", "utf8");

const opponentChoosesRockScore = {
  X: 1 + 3, // rock
  Y: 2 + 6, // paper
  Z: 3 + 0, // scissors
  winLoseDrawAlias: {
    X: "Z", // lose
    Y: "X", // draw
    Z: "Y", // win
  },
};

const opponentChoosesPaperScore = {
  X: 1 + 0, // rock
  Y: 2 + 3, // paper
  Z: 3 + 6, // scissors
  winLoseDrawAlias: {
    X: "X", // lose
    Y: "Y", // draw
    Z: "Z", // win
  },
};

const opponentChoosesScissorsScore = {
  X: 1 + 6, // rock
  Y: 2 + 0, // paper
  Z: 3 + 3, // scissors
  winLoseDrawAlias: {
    X: "Y", // lose
    Y: "Z", // draw
    Z: "X", // win
  },
};

const opponentChoiceScoringLookup = {
  A: opponentChoosesRockScore,
  B: opponentChoosesPaperScore,
  C: opponentChoosesScissorsScore,
};

const partOneRawInputToRoundScoresConverter = (rawInput) => {
  return rawInput.map((roundInput) => {
    const scoringLookup = opponentChoiceScoringLookup[roundInput[0]];
    return scoringLookup[roundInput[2]];
  });
};

const partTwoRawInputToRoundScoresConverter = (rawInput) => {
  return rawInput.map((roundInput) => {
    const scoringLookup = opponentChoiceScoringLookup[roundInput[0]];
    return scoringLookup[scoringLookup.winLoseDrawAlias[roundInput[2]]];
  });
};

const totalRpsScore = (input, rawInputToRoundScoresConverter) => {
  const rounds = input.split("\n");
  const roundScores = rawInputToRoundScoresConverter(rounds);

  const totalScore = roundScores.reduce((partialSum, a) => partialSum + a, 0);

  return totalScore;
};

console.log(
  "Part 1 answer: " +
    totalRpsScore(input, partOneRawInputToRoundScoresConverter)
);

console.log(
  "Part 2 answer: " +
    totalRpsScore(input, partTwoRawInputToRoundScoresConverter)
);
