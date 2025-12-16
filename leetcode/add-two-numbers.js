// const addTwoNumbers = (l1, l2) => {
//   const join1 = l1.reverse().join("");
//   const join2 = l2.reverse().join("");

//   const displayResult = Number(join1) + Number(join2)

//   const getArr = String(displayResult).split("")

//   return getArr.reverse()
// }

// console.log(addTwoNumbers([2,4,3], [5,6,4]))
// console.log(addTwoNumbers([9,9,9,9,9,9,9], [9,9,9,9]))

const addTwoNumbers = (l1, l2) => {
  const getL1 = l1.reduce((acc, sum) => {
    return acc * 10 + sum;
  }, 0);

  const getL2 = l2.reduce((acc, sum) => {
    return acc * 10 + sum;
  }, 0);

  const result = getL1 + getL2;

  return String(result).split('')
};

console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));
