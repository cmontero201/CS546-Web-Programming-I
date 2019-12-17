const express = require("express");
const router = express.Router();
const data = require("../data");
const postData = data.posts;


// DONE
router.get("/", async (req, res) => {
    try {
        const postList = await postData.readAllPosts();
        res.json(postList);
    } catch (e) {
        res.status(400).json( {error: e} );
    }
});

// DONE
router.post("/", async (req, res) => {
    const postInfo = req.body;

    if (!postInfo.title) {
        res.status(400).json( {error: "A post title must be provided."});
    }
    if (!postInfo.content) {
        res.status(400).json( {error: "A post body must be provided"});
    }
    if (!postInfo.author) {
        res.status(400).json( {error: "An author ID must be provided."});
    }

    try {
        const posted = await postData.createPost(postInfo.title, postInfo.author, postInfo.content);
        res.status(200).json(posted);
    } catch (e) {
        res.status(400).json( {error: e});
    }
});

// DONE
router.get("/:id", async (req, res) => {
    try {
        const post = await postData.readPost(req.params.id);
        res.status(200).json(post);
    } catch (e) {
        res.status(404).json( {error: "Post with provided ID not found"} );
    }
});

// DONE
router.put("/:id", async (req, res) => {
    const updatedData = req.body;
    console.log(updatedData)

    if (!updatedData) {
        res.status(400).json({ error: "You must provide data to create an animal" });
        return;
    }
    if (!updatedData.newTitle) {
        newTitle = undefined;
    }
    if (!updatedData.newContent) {
        newContent = undefined;
    }
    if (!updatedData.newTitle && !updatedData.newContent) {
        res.status(400).json({ error: "You must provide either a new post title or post content" });
        return;
    }

    try {
        const post = await postData.readPost(req.params.id);
    } catch (e) {
        res.status(404).json( {error: "Animal with provided ID not found"} );
    }

    try {
        const post = await postData.readPost(req.params.id);
        console.log("HERE",post)

        if (!updatedData.newTitle) {
            const updatedPost = await postData.updatePost(req.params.id, post.title, post.author._id, updatedData.newContent);
            res.status(200).json(updatedPost);
        } else if (!updatedData.newContent) {
            const updatedPost = await postData.updatePost(req.params.id, updatedData.newTitle, post.author._id, post.content);

            res.status(200).json(updatedPost);
        } else {
            const updatedPost = await postData.updatePost(req.params.id, updatedData.newTitle, post.author._id, updatedData.newContent);
            console.log("UPDATED: ", updatedPost)
            res.status(200).json(updatedPost);
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// DONE
router.delete("/:id", async (req, res) => {
    try {
        let post = await postData.readPost(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "Post not found" });
    }
    
    try {
        const deleted = await postData.deletePost(req.params.id);
        console.log(deleted)
        
        res.status(200).json(deleted);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});
    
module.exports = router;