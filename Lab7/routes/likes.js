const express = require("express");
const router = express.Router();
const data = require("../data");
const animalData = data.animals;
const postData = data.posts;
const likesData = data.likes;


router.post("/:id", async (req,res)=>{
    try {       
        postId = req.query.postId;
        animalId = req.params.id
       
        const likeThePost = await likesData.like(animalId, postId)
        res.sendStatus(200)
    } catch(e) {
        res.sendStatus(404).json({error:e});
    }
});

router.delete("/:id", async (req,res)=>{
    try {
        postId = req.query.postId;
        animalId = req.params.id

        const dislikedThePost = await likesData.unlike(animalId, postId)
        res.sendStatus(200)
    } catch(e) {
        res.sendStatus(404).json({error:e});
    }
});

module.exports = router;
