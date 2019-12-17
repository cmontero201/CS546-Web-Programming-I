const lab1 = require("./lab1");

console.log(lab1.questionOne([1, 2, 3]));           // should output 14
console.log(lab1.questionOne([3,6,2]));
console.log(lab1.questionOne([23,123,2]));
console.log(lab1.questionOne([55,12,5]));
console.log(lab1.questionOne([4,8,1]));

console.log(lab1.questionTwo(7));                   // should output 13 
console.log(lab1.questionTwo(10000));
console.log(lab1.questionTwo(17));
console.log(lab1.questionTwo(5));
console.log(lab1.questionTwo(127));



console.log(lab1.questionThree("Mr. and Mrs. Dursley, of number four, Privet Drive, were  proud  to  say  that  they  were  perfectly  normal,  thank you  very  much. They  were  the  last  people  youd  expect  to  be  involved in anything strange or mysterious, because they just didn't hold with such nonsense. \n Mr. Dursley was the director of a firm called Grunnings, which  made  drills.  He  was  a  big,  beefy  man  with  hardly  any  neck,  although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son  called  Dudley  and  in  their  opinion  there  was no finer boy anywhere.")); 
// should output 196
console.log(lab1.questionThree("you fit into me like a hook into an eye a fish hook an open eye"));
console.log(lab1.questionThree("And then the day came when the risk to remain tight in a bud was more painful than the risk it took to blossom."));
console.log(lab1.questionThree("The yellow cow is not brown because it is yellow. Its a yellow cow. Duh."));
console.log(lab1.questionThree("I come with no wrapping or pretty pink bows. I am who I am, from my head to my toes. I tend to get loud when speaking my mind. Even a little crazy some of the time"));

// Text Source: https://www.familyfriendpoems.com/poems/other/short/"));


console.log(lab1.questionFour(10));                 // should output 3628800 
console.log(lab1.questionFour(23));  
console.log(lab1.questionFour(46));  
console.log(lab1.questionFour(8));  
console.log(lab1.questionFour(4));  


