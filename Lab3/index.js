/*
Created by Christian Montero 
June 10, 2019
CS 546 Lab 3
*/

const axios = require('axios');



async function main() {

    try {
        await firtsNameMetrics();


        console.log(await getPersonById(333)); // THROWS
        console.log(await getPersonById(42));
        console.log(await getPersonById()); // THROWS
        console.log(await getPersonById(9000)); // THROWS
        // console.log(await getPersonById('foo'));


        // console.log(await lexIndex(2));
        // console.log(await lexIndex(2000)); // THROWS
        // console.log(await lexIndex()); // THROWS
        // console.log(await lexIndex("s")); // THROWS


        // console.log(await shouldTheyGoOutside("Scotty", "Barajaz")) // Returns "Yes, Scotty should go outside."
        // console.log(await shouldTheyGoOutside("Calli", "Ondrasek")) // Returns "No, Calli should not go outside."
        // console.log(await shouldTheyGoOutside())// Throws Error
        // console.log(await shouldTheyGoOutside("Bob"))// Throws Error
        // console.log(await shouldTheyGoOutside("Bob", "Smith")) // Throws Error


        // console.log(await whereDoTheyWork("Demetra", "Durrand")) // Returns: "Demetra Durrand - Nuclear Power Engineer at Buzzshare. They will be fired."
        // console.log(await whereDoTheyWork("Hank", "Tarling")) // Returns: "Hank Tarling - Technical Writer at Babbleblab. They will not be fired."
        // console.log(await whereDoTheyWork()) // Throws Error
        // console.log(await whereDoTheyWork("Bob")) // Throws Error
        // console.log(await whereDoTheyWork("Bob", "Smith")) // Throws Error


        // console.log(await findTheHacker("79.222.167.180"))
        // console.log(await findTheHacker("16.178.151.54")) // Sheffy Delgardillo
        // console.log(await findTheHacker("79.222.167.180"))// Returns: "Robert Herley is the hacker!"
        // console.log(await findTheHacker("foobar")) // Throws Error
        // console.log(await findTheHacker()) // Throws Error 
    } catch (err) {
        return (err)
    }   
    
}






// function checkIndex(index) {
//     if (typeof(index) != "number") {
//         return `${index || "provided input"} is not of correct type (Number)`;
//     } 
// }
// function checkBounds(index) {
//     if (index < 0 || index > 500) {
//         return "provided input is not with in bounds (1-500)";
//     }
// }
// function checkNames(firstName, lastName) {
//     if (typeof(firstName) != "string" || typeof(lastName) != "string") {
//         return `${firstName || lastName || "provided input"} must be defined`;     
//     }

// }
// function checkIP(ip) {
//     if (typeof(ip) != "string") {
//         return `${ip || "provided input"} is not of correct type (String)`;

//     }
// }

function getVowels(name) {
    var count = 0;
    for (ind in name) {
        if (name[ind] == 'a' || name[ind] == 'e' || name[ind] == 'i' || name[ind] == 'o' || name[ind] == 'u') {
            count++;
        }
    }

    return count;
}
function sortObj(prop) {

    return function (a,b) {
        return a[prop].localeCompare(b[prop]);
    }
}










async function getPersonById(index) {
    try {

        if (typeof(index) != "number") {
            throw `${index || "provided input"} is not of correct type (Number)`;
        } 

        if (index < 0 || index > 500) {
            throw "provided input is not with in bounds (1-500)";
        }

        async function getPeople() {
            try {
                var data = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
                data = data.data

                var first = data[index].firstName;
                var last = data[index].lastName;
                return (first + " " + last); 
            } catch (err) {
                return (err);
            }
        }
        var result = await getPeople(index);
        return (result);

    } catch (err) {
        return (err);
    }
};
async function lexIndex(index) {
    try {
        if (typeof(index) != "number") {
            return `${index || "provided input"} is not of correct type (Number)`;
        } 

        if (index < 0 || index > 500) {
            return "provided input is not with in bounds (1-500)";
        }
        async function getPeople() {
            try {
                var data = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
                data = data.data
                var result = data.sort(sortObj("lastName"));
                return (result[index].firstName + " " + result[index].lastName);
            } catch (err) {
                return (err);
            }
        }
        var name = await getPeople();
        return (name);
    } catch (err) {
        return (err);
    }
}
async function firtsNameMetrics() {
    try {
        var metrics = {
            "totalLetters": 0, //sum of all the letters in all the firstNames
            "totalVowels": 0, //sum of all the vowels in all the firstNames
            "totalConsonants": 0, //sum of all the consonants in all the firstNames
            "longestName": "", // the longest firstName in the list,
            "shortestName": "aaaaaaa", //the shortest firstName in the list
        }
    
        async function getPeople() {
            try {
                var data = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
                data = data.data

                for (var ind in data) {
                    var first = data[ind].firstName;
                    var fname = first.replace(/\s+/g, "").toLowerCase();
    
                    metrics.totalLetters += first.length;
                    metrics.totalVowels += getVowels(fname);
                    metrics.totalConsonants += (first.length - getVowels(fname));
    
                    if (first.length > metrics.longestName.length) {
                        metrics.longestName = first;
                    }
    
                    if (first.length < metrics.shortestName.length) {
                        metrics.shortestName = first;
                    }
                }
                return metrics;
            } catch (err) {
                return (err);
            }
        }
    
        var metricData = await getPeople();
        return (metricData);

    } catch (err) {
        return (err);
    }

    
};
async function shouldTheyGoOutside(firstName, lastName) {
    try {
        if (typeof(firstName) != "string" || typeof(lastName) != "string") {
            return `${firstName || lastName || "provided input"} must be defined`;     
        }

        async function getPeople() {
           try {
                var data = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
                data = data.data
            
                firstNames = [];
                lastNames = [];
    
                for (var ind in data) {
                    firstNames.push(data[ind].firstName) 
                    lastNames.push(data[ind].lastName) 
                }

                if ((firstNames.includes(firstName)) && (lastNames.includes(lastName))) {
                    var zip = data[firstNames.indexOf(firstName)].zip;
                    return [data[lastNames.indexOf(lastName)].firstName, zip];
                } else {
                    return "The provided name does not exist"
                }
            } catch (err) {
               return (err)
           }
        }

        var zipC = await getPeople();
    
        async function getWeather([first, zipCode]) {
           try {
                var data = await axios.get("https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json");
                data = data.data
                
                for (var indW in data) {
                    if (data[indW].zip == zipCode && data[indW].temp >= 34) {
                        return `Yes, ${first} should go outside.`
                    } else if (data[indW].zip == zipCode && data[indW].temp < 34) {
                        return `No, ${first} should not go outside.`
                    } else {
                        continue;
                    }
                }
            } catch (err) {
                return (err)
            }
        }
    
        var [first, zipCode] = await getPeople();
        var decision = await getWeather([first, zipCode]);
        return (decision)
    } catch (err) {
        return (err);
    }
}
async function whereDoTheyWork(firstName, lastName) {
    try {
        if (typeof(firstName) != "string" || typeof(lastName) != "string") {
            return `${firstName || lastName || "provided input"} must be defined`;     
        }

        if (!firstName || !lastName) {
            return "Both first and last names must be entered"
        }
        async function getPeople() {
            try {
                var data  = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
                data = data.data

                firstNames = [];
                lastNames = [];
        
                for (var ind in data) {
                    firstNames.push(data[ind].firstName) 
                    lastNames.push(data[ind].lastName) 
                }
    
                if ((firstNames.includes(firstName)) && (lastNames.includes(lastName))) {
                    var first = data[firstNames.indexOf(firstName)].firstName;
                    var last = data[firstNames.indexOf(firstName)].lastName;
                    var social = data[firstNames.indexOf(firstName)].ssn;

                    info = [first, last, social]
                } else {
                    return "That person does not exist";
                }

                return info;
            } catch (err) {
                return (err);
            }
        }

        async function getWork(inf) {
            try {
                inf = info;
                if (inf == undefined) {
                    return " Doesn't Exist"
                }

                var data = await axios.get("https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json");
                data = data.data

                social = info[2]
                
                ssns = []

                for (var ind in data) {
                    ssns.push(data[ind].ssn) 
                }

                if (ssns.includes(social)) {
                    info.push(data[ssns.indexOf(social)].jobTitle)
                    info.push(data[ssns.indexOf(social)].company)
                    info.push(data[ssns.indexOf(social)].willBeFired)

                    return info
                }
            } catch (err) {
                return (err);
            }
        }

        var inf = await getPeople();
        
        if (inf == undefined) {
            return;
        } else {
            var info = await getWork(inf);
            if (info[5] == false) {
                return (info[0] + " " + info[1] + " - " + info[3] + " at " + info[4] + ". They will not be fired.");
            } else if (info[5] == true) {
                return (info[0] + " " + info[1] + " - " + info[3] + " at " + info[4] + ". They will be fired.");
            } else {
                return "";
            }
        }

    } catch (err) {
        return (err);
    }
};
async function findTheHacker(ip) {
    
    try {
        if (typeof(ip) != "string") {
            return `${ip || "provided input"} is not of correct type (String)`;
    
        }
        
        async function getWork() {
            try {
                var data = await axios.get("https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json");
                data = data.data

                ips = [];
                info = [];

                for (var ind in data) {
                    ips.push(data[ind].ip) 
                }

                if ((ips.includes(ip)) ) {
                    var social = data[ips.indexOf(ip)].ssn;

                    info.push(social)

                    return info
                } else {
                    return "That IP does not exist";
                }

                
            } catch (err) {
                return (err);
            }
        }

        async function getPeople(social) {
            try {
                info = social;

                var data = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
                data = data.data

                socials = [];
        
                for (var ind in data) {
                    socials.push(data[ind].ssn) 
                }

                if ((socials.includes(info[0]))) {
                    var first = data[socials.indexOf(info[0])].firstName;
                    var last = data[socials.indexOf(info[0])].lastName;

                    info.push(first);
                    info.push(last);

                    return info
                } else {
                    return
                }
            } catch (err) {
                return (err);
            }
        }

        var social = await getWork();

        if (social == undefined) {
            return
        } else {
            var info = await getPeople(social);
            
            if (info == undefined || social == undefined) {
                return;
            } else {
                return (info[1] + " " + info[2] + " is the hacker!");
            }
        }
        
    } catch (err){
        return (err);
    }
};



main()