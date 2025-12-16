// 1. Using Set (Easiest Method)

const arr = [1, 2, 2, 3];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3]

console.log("==================");
// 2. Using filter + indexOf

const filterArr = [1, 2, 2, 3];
const uniqueFilter = filterArr.filter((item, index) => {
  return arr.indexOf(item) === index;
});

console.log(uniqueFilter); // [1, 2, 3]

console.log("===================");
// 3. Using reduce

const reduceArr = [1, 2, 2, 3];

const uniqueReduce = reduceArr.reduce((acc, val) => {
  if (!acc.includes(val)) acc.push(val);
  return acc;
}, []);

console.log(uniqueReduce); // [1, 2, 3]


