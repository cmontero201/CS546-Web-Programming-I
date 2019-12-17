function checkArgs(args) {
    if (args.length < 2) {
        throw `${args || "provided input"} must contain 2 or more arguments`;
    }
}

function checkObj(args) {
    for (ind in args) {
        if (typeof args[ind] != 'object' || typeof args[ind] != 'Object') {
            throw `${args || "provided input"} must be of type object`
        } 
    }
}

function checkDefine(args) {
    for (ind in args) {
        if (typeof args[ind] == 'undefined') {
            throw new ReferenceError("Undefined Input")
        } 
    }
}

function checkFunc(func) {
    if (typeof(func) == 'undefined') {
        throw new ReferenceError("Undefined Input")
    } 

    if (typeof(func) != 'function') {
        throw `${func || "provided input"} must be of type function` 

    }
}

function checkOb(object) {
    if (typeof(object) != 'object') {
        throw `${args || "provided input"} must be of type object`
    }
}


module.exports = {
    description: "this module exports 3 object methods",

    extend: (...args) => {
        checkArgs(args);
        checkObj(args);
        checkDefine(args);

        var newDict = {};

        for (var arr_ind in args) {
            var dict = args[arr_ind];
            for (var in_ind in dict) {
                if (!(in_ind in newDict)) {
                    newDict[in_ind] = dict[in_ind];
                }
            }
        }
        return newDict;
    },

    smush: (...args) => {
        checkArgs(args);
        checkObj(args);
        checkDefine(args);

        var newDict = {};

        for (var arr_ind in args) {

            var dict = args[arr_ind];

            for (in_ind in dict) {
                if (!(dict[in_ind] in newDict)) {
                    newDict[in_ind] = dict[in_ind];
                } else if (dict[in_ind] in newDict) {
                    newDict[in_ind] = dict[in_ind];
                }
            }
        }
        return newDict;
    },

    mapValues: (object, func) => {
        // check that the object and function exist and they have proper types.
       checkOb(object)
       checkFunc(func);

        var f = func;
        var dict = {};

        for (var ind in object) {
            dict[ind] = f(object[ind]);
        }
        return dict;
    }
}
