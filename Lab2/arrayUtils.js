function checkArray(array) {
    if (typeof(array) == 'undefined') {
        throw `${array || "provided input"} is undefinded`
    }
    if (!Array.isArray(array)) {
        throw `${array || "provided input"} is not an array`;
    }
}

function checkLength (array) {
    if (array.length == 0) {
        throw 'provided input is an empty array';
    }
}

function checkBounds(array, index) {
    if ((index < 0) || (index > array.length - 1)) {
        throw `${array || "provided index"} is greater than the length of your array`;
    }
}

function checkEnd(end) {
    if (end < 0) {
        throw `${end || "provided input"} must be greater than zero`;
    }

    if (typeof end != 'number') {
        throw `${end || "provided input"} is not of correct type`;
    }
}

module.exports = {
    description: "This module will export 6 array functions",

    head: (array) => {
        checkArray(array);
        checkLength(array);

        return array[0];
    },

    last: (array) => {
        checkArray(array);
        checkLength(array);

        return array[array.length - 1];
    },

    remove: (array, index) => {
        checkArray(array);
        checkLength(array);
        checkBounds(array, index);

        var removed = array.splice(index, 1);
        return array;
    },

    range: (end, value) => {
        value = value || 0;

        arr = [];
        checkEnd(end);
        
        if (value == 0) {
            for ( var i = 0; i <= end - 1; i++) {
                arr.push(i);
            }
        } else {
            for (var i = 0; i <= end - 1; i++) {
                arr.push(value);
            }
        }
        return arr;
    },

    countElements: (array) => {
        checkArray(array);

        var dict = {};

        if (array.length == 0) {
            return "No count ... array is empty"
        }

        for (var ind in array) {
            if (!(array[ind] in dict)) {
                dict[array[ind]] = 1;
            } else {
                dict[array[ind]]++;
            }
        }
        return dict;
    },

    isEqual: (arrayOne, arrayTwo) => {
        checkArray(arrayOne);
        checkArray(arrayTwo);

        var bool = true;
        const len = arrayOne.length - 1;

        if (arrayOne.length != arrayTwo.length) {
            return false;
        }

        for (var i = 0; i <= len; i++) {
            if (arrayOne[i] != arrayTwo[i]) {
                return false;
            } 
        }
        return true;
    }
}