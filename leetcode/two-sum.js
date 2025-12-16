const twoSum = (nums, target) => {
  return nums
    .flatMap((num, numIndex) => {
      return nums
        .slice(numIndex + 1)
        .map((numSlice, sliceIndex) =>
          num + numSlice === target
            ? [numIndex, sliceIndex + numIndex + 1]
            : null
        );
    })
    .find((num) => num !== null);
};

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 7));
console.log(twoSum([3, 3], 6));
