const express = require('express');
const router = express.Router();

router.get("/about", (req, res) => {

    let aboutJSON = {
        name: "Christian Montero",
        cwid: "10442644",
        biography: "Hello! My name is Christian Montero and I was born in Hackensack, NJ to two amazing and supportive parents. I have two siblings: my older brother, Chris, and my younger sister, Chrystal. \nI recieved my Bachelore of Science in Biomedical Engineering at Boston Univiersity (class of 2017) and I am pursuing my Masters of Science in Computer Science at Stevens Institute of Technology. I am currently living in Harrison, NJ while I work full time at Memorial Sloan Kettering Cancer Center as a Biomedical Equipment Technician.",
        favoriteShows: ["Big Little Lies", "Veep", "Game of Thrones (all seasons except the last)", "Handmaids Tale", "Rick and Morty", "Law and Order: SVU"],
        hobbies: ["Kayaking", "Cooking", "Traveling", "Working Out (weight lifting)", "Running"]
    } 

    res.json(aboutJSON);
});


router.get("/story", (req, res) => {

    let storyJSON = {
        storyTitle: "What is the most valuable programming skill at the moment?",
        story: "There is not a single place I can walk into with my phone, without at least one person raising the all to familiar question: 'Whoa, no case?' The decision to not have an case on my all glass iPhone (an all phones that preceded) is a personal and difficult decison. While some may see having a case on their phone is a means to preserve the beauty of the (costly) phone, I see a case as an ugly obstruction to the beauty of something I've used my hard earned money to aqcuire. \nThe iPhone XS is, arguably, the most beautifully designed phone to date. The chasis of the phone is an undenieable eye catching all glass design. Unfortunatley, the phone is as beautiful as it is fragile. I have had to replace this phone at least 4 times. AppleCare+ has certainly been a good invetment, but that only covers 2 incidents of accidental damage. So the other two incidents required some persuasion and hard earned cash. \nAlthough I am not one to drop my phone (only two of my 15 broken phones were my fault), I surround myself with people who are not as careful. My friends have dropped my phone 8 times. And the remaining damages were caused by my amazing niece and nephews. Despite all these incidents, I refuse to put a phone case on. I have to much respect for the design of the phone."
    }

    res.json(storyJSON);
});


router.get("/education", (req, res) => {
    
    let educationJSON = [
        {
            schoolName: "Hackensack High School",
            degree: "High School Diploma",
            favoriteClass: "My favorite class during my high school career was defintiely AP Chemisry. For some reason, every aspect of the course made so much sense to me. This course influenced my decision to pursue an undergraduate degree as a Chemsitry major.",
            favoriteMemory: "My fondest memory is working stage crew for the therater department shows with my friends."
        },
        {
            schoolName: "Boston University",
            degree: "Bachelor of Science, Biomedical Engineering",
            favoriteClass: "Introduction to Engineering Design was a course that had the largest impact on me during my time at BU. After several discouraging encounters within the Chemistry department at my university, I decided to switch my major into the College of Engineering. This was my first engineering course, and it solidified my decision to pursue an engineering degree",
            favoriteMemory: "Sitting in my dorm room with my roommate, shouting at eachother in various accents release some post class stress."
        },
        {
            schoolName: "Stevens Institute of Technology",
            degree: "Master of Science, Computer Science",
            favoriteClass: "As of right now, Web Programming I is my favorite course I have yet to take. The way the course is run is very clear, concise, and organized.",
            favoriteMemory: "Scrambling to figure out whats going on a weekly basis...it's surprisingly a bit of a exciting rush."
        }
    ]

    res.json(educationJSON);    
});


router.get("/", (req, res) => {
    res.sendStatus(501);
});

module.exports = router;