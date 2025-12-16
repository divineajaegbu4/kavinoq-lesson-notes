const num = [1, 3,35, 64, 3];

const fullName = "Ajaegbu Divine"

console.log(Array.isArray(num)) // true
console.log(Array.of(num));// [ [ 1, 3, 35, 64, 3 ] ]
console.log(Array.from(fullName)); // For string: ["A", "J" .....]
console.log(Array.of(1, 2, 3, 4, 5)); // For numbers: [1, 2, 3, 4, 5]
