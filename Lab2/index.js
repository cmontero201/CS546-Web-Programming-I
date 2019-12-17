const arrayUtil = require("./arrayUtils");
const stringUtil = require("./stringUtils");
const objectUtil = require("./objUtils");

///
// HEAD TESTS - ARRAY
try {
    // Should Pass
    const headOne = arrayUtil.head([2, 3, 4]);
    console.log('CASE 1A: head passed successfully');
    console.log("Output: ", headOne);
} catch (e) {
    console.error('head failed test case');
}

try {
    // Should Fail
    const headTwo = arrayUtil.head([1234]);
    console.error('CASE 1B: head did not error');
} catch (e) {
    console.log('CASE 1B: head failed successfully');
}
///


///
// REPEAT TESTS - STRING
try {
    // Should Pass
    const repeatOne = stringUtil.repeat("Call", 4);
    console.log('\n\nCASE 2A: repeat passed successfully');
    console.log('Output: ', repeatOne);
} catch (e) {
    console.log('\nCASE 2A: repeat failled test case');
}

try {
    // Should Fail
    const repeatTwo = stringUtil.repeat(33, 3);
    console.error('\nCASE 2B: repeat did not error');
} catch (e) {
    console.log('CASE 2B: repeat failed successfully');
}
///


///
// COUNTCHARS TEST - STRINGS
try {
    // Should Pass
    const countCharsOne = stringUtil.countChars("Well, lets try this one.");
    console.log('\n\nCASE 3A: countChars passed successfully');
    console.log("Output: \n", countCharsOne);
} catch (e) {
    console.log('\nCASE 3A: countChars failled test case');
}

try {
    // Should Fail
    const countCharsTwo = stringUtil.countChars(112);
    console.error('CASE 3B: countChars did not error');
} catch (e) {
    console.log('CASE 3B: countChars failed successfully');
}
///


///
// EXTEND TEST - OBJECTS
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };

try {
    // Should Pass
    const extendOne = objectUtil.extend(second, third);
    console.log('\nCASE 4A: extend passed successfully');
    console.log('Output: ', extendOne);
} catch (e) {
    console.log('\nCASE 4A: extend failled test case');
}

try {
    // Should Fail
    const extendOne = objectUtil.extend(six, five, one);
    console.error('\nCASE 4B: extend did not error');
} catch (e) {
    console.log('CASE 4B: countChars failed successfully');
}
///
