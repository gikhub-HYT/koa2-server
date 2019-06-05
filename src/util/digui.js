
const { isArray, isObject, isEmpty } = require('./check')

function digui(target) {

    Object.keys(target).forEach((key) => {
        if (isArray(target[key])) {

        } else if (isObject(target[key])) {

        } else {

        }
    })



}
let a = [], b = { a: '' };
// console.log('check', check)
console.log('a_isArray', isArray(a))
console.log('a_isEmpty', isEmpty(a))
console.log('b_isObject', isObject(b))
console.log('b_isEmpty', isEmpty(b))
