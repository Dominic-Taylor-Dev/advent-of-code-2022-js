import fs from "fs";

let input = fs.readFileSync("./input.txt", "utf8");

// note this returns the solutions to both parts as an array
const maxCalories = (foodList) => {
  const foodPerElf = foodList.split("\n\n");
  const caloriesPerElf = foodPerElf.map((foodList) => {
    const foodListTidiesFromBlankLines = foodList.split(`\n`);

    return foodListTidiesFromBlankLines.reduce(
      (partialSum, a) => partialSum + parseInt(a),
      0
    );
  });

  const caloriesPerElfSortedDescending = caloriesPerElf.sort((a, b) => {
    return b - a;
  });

  const [maxCalories, secondMaxCalories, thirdMaxCalories, ...rest] =
    caloriesPerElfSortedDescending;

  return [
    `Max calories: ${maxCalories}`,
    `Sum of top three calories: ${
      maxCalories + secondMaxCalories + thirdMaxCalories
    }`,
  ];
};

console.log(maxCalories(input));
