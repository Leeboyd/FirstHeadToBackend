// import * as calc from './calc'
import calc from './calc'

const x = 3
const y = 5

console.log(`${calc.name}`)

const result_add = calc.add(x, y);
console.log(`${x} + ${y} = ${result_add}`)

const result_subtract = calc.subtract(x, y);
console.log(`${x} - ${y} = ${result_subtract}`)

const result_multiple = calc.multiple(x, y);
console.log(`${x} * ${y} = ${result_multiple}`);

const result_divide = calc.divide(x, y);
console.log(`${x} / ${y} = ${result_divide}`);