import fs from "fs";

let input = fs.readFileSync("./input.txt", "utf8");

const getPriorityScoreOfItem = (letter) => {
  const asciiCode = letter.charCodeAt();

  // a-z is ASCII 97-122
  if (asciiCode >= 97 && asciiCode <= 122) {
    return letter.charCodeAt() - 96;
  }

  // A-Z is ASCII 65-90
  if (asciiCode >= 65 && asciiCode <= 90) {
    return letter.charCodeAt() - 38;
  }

  return 0;
};

const getPriorityScoreOfMisplacedItem = (rucksackContents) => {
  const halfSize = Math.ceil(rucksackContents.length / 2);

  const firstHalfSet = new Set(rucksackContents.slice(0, halfSize));
  const firstHalfArray = [...firstHalfSet];
  const secondHalfSet = new Set(rucksackContents.slice(halfSize));
  const secondHalfArray = [...secondHalfSet];

  let sharedElement;

  for (let i = 0; i < firstHalfArray.length; i++) {
    if (secondHalfArray.includes(firstHalfArray[i])) {
      sharedElement = firstHalfArray[i];
      break;
    }
  }

  return getPriorityScoreOfItem(sharedElement);
};

const getSumOfPrioritiesOfMisplacedItems = (input) => {
  const allRucksacks = input.split("\n");
  return allRucksacks.reduce(
    (partialSum, singleRucksack) =>
      partialSum + getPriorityScoreOfMisplacedItem(singleRucksack),
    0
  );
};

const getSumOfBadges = (input) => {
  const allRucksacks = input.split("\n");
  const remainingRucksacks = allRucksacks;
  let sumOfBadges = 0;
  while (remainingRucksacks.length) {
    const firstRucksackInTrio = remainingRucksacks.shift();
    const secondRucksackInTrio = remainingRucksacks.shift();
    const thirdRucksackInTrio = remainingRucksacks.shift();

    let sharedElement;

    for (let i = 0; i < firstRucksackInTrio.length; i++) {
      if (
        secondRucksackInTrio.includes(firstRucksackInTrio[i]) &&
        thirdRucksackInTrio.includes(firstRucksackInTrio[i])
      ) {
        sharedElement = firstRucksackInTrio[i];
        break;
      }
    }

    sumOfBadges += getPriorityScoreOfItem(sharedElement);
  }

  return sumOfBadges;
};

console.log("Part 1 answer: " + getSumOfPrioritiesOfMisplacedItems(input));

console.log("Part 2 answer: " + getSumOfBadges(input));
