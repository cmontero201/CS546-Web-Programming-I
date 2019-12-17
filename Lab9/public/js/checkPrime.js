function checkPrime(){

    var num = $("#input").val()
    console.log("HERE")

    if (num) {
       var isPrime = primeChecker(num);

       if (isPrime) {
           $("#attempts").append("<li class='is-prime'>" + num + " is a prime number</li>");
       } else {
           $("#attempts").append("<li class='not-prime'>" + num + " is Not a prime number</li>");
       }
    } else {
        alert("A Valid Number Must Be Entered...")
    }
}

function primeChecker (num) {
    if (num == 1) {
        return false;
    } else if (num == 2) {
        return true;
    } else {
        for (var i = 2; i < num; i++) {
            if (num % i == 0) {
                 return false;
            }
        }
        return true;
    }
}