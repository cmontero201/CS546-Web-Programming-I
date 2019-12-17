function checkString(string) {
    if (typeof(string) != 'string') {
        throw `${string || "provided input"} is not a string`
    }

    if (typeof(string) == 'undefined') {
        throw `${string || "provided input"} is undefinded`
    }
}

function checkNum(num) {
    if (num < 0) {
        throw `${num || "the number provided"} must be greater than zero`;
    }
}

module.exports = {
    description: "This module will export 3 string functions",

    capitalize: (string) => {
        checkString(string);

        if (string.length == 0) {
            console.log("You have entered an empty string");
        }

        var newStr = '';

        for (var ind in string) {
            if (ind == 0) {
                newStr += string[ind].toUpperCase();
            } else {
                newStr += string[ind].toLowerCase();
            }
        }
        return newStr;
    },

    repeat(string, num) {
        checkString(string);
        checkNum(num);

        var newStr = string.repeat(num);

        return newStr;
    },

    countChars: (string) => {
        checkString(string);

        var dict = {};

        for (var ind in string) {
            if (!(string[ind] in dict)) {
                dict[string[ind]] = 1;
            } else {
                dict[string[ind]]++;
            }
        }
        return dict;
    }
}