/*
Created by Christian Montero
May 28, 2019
CS546-WS
*/

const questionOne = function questionOne(arr) {
    // Implement question 1 here
    var counter = 0;
    for(var index in arr) {
        var sq = arr[index] * arr[index];
        counter += sq;
    }
    console.log("SUM: ", counter);
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    // F_n = F_{n-1} + F_{n-2}

    var hold = 0;
    var arr = [];

    while (hold <= num) {
        if (hold == 0) {
            arr.push(0);
            hold++;
            
        } else if (hold == 1) {
            arr.push(1);
            hold++;
            
        } else {
            var n1 = arr[hold - 1];
            var n2 = arr[hold - 2];
            var fib = n1 + n2;

            arr.push(fib);
            hold++;
        }
    }
    console.log("FIBONACCI: ", arr.pop());
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    var count = 0
    text = text.replace(/\s+/g, "").toLowerCase();
    for (var index in text) {
        var curr = text[index];
        if (curr == 'a' || curr == 'e' || curr == 'i' || curr == 'o' || curr == 'u') {
            count++;
        }
    }
    console.log("NUMBER OF VOWELS: ", count);
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    var hold = 1;
    var arr = [1];
    if (num == 0) {
        console.log("FACTORIAL: ", arr.pop())
    } else {
        while (hold <= num) {
            var fact = hold * arr[hold - 1];

            arr.push(fact)
            hold++;
        }
    }
    console.log("FACTORIAL: ", arr.pop())
}

module.exports = {
    firstName: "Christian", 
    lastName: "Montero", 
    studentId: "10442644",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};