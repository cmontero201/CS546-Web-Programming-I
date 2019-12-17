const mongoCollections = require("./collections");
const mongo = require('mongodb');
const { ObjectID } = require('mongodb');
const animals = require("./animals");
const posts = mongoCollections.posts;
const animalCollection = mongoCollections.animals;

let exportedMethods = {
    async createPost(title, author, content) {
        try {
            if (!title) throw "You must provide a title";
            if (!content) throw "You must provide a body";
            if (!author) throw "You must specify a poster";

            if (typeof(title) != "string" || typeof(content) != "string") {
                throw "Title and content must be of type string";
            }

            if (typeof(author) != "string") {
                if (!(author instanceof ObjectID)) {
                    throw "Author must be of type string or ObjectID";
                }
            }

            const postCollection = await posts();
            const animalsCollection = await animalCollection();
            const animalThatPosted = await animals.getId(author);
            console.log("THEY POSTED",animalThatPosted)
            var theId = new mongo.ObjectID(author);
    
            let newPostInfo = {
                "title": title,
                "content": content,
                "author": {
                    "_id": animalThatPosted._id,
                    "name": animalThatPosted.name
                }
            };

            const insertInfo = await postCollection.insertOne(newPostInfo);
            if (insertInfo.insertedCount === 0) throw "Unable to add post";
    
            const newPost = await this.readPost(insertInfo.insertedId);

            let postJSON = {
                "_id": newPost._id.toHexString(),
                "title": title
            };

            if (animalThatPosted.posts == undefined) {
                animalThatPosted.posts = [];
                const updated = await animalsCollection.updateOne( {_id: theId}, {$set: animalThatPosted} );
                if (updated.insertedCount === 0) throw "Unable to add post";
            } 

            const updated = await animalsCollection.updateOne( {_id: theId}, {$addToSet: {posts: postJSON} });
            if (updated.insertedCount === 0) throw "Unable to add post";

            console.log(newPost);
            return newPost;
        } catch (err) {
            return err;
        }
    },

    async readAllPosts() {
        try {
            const postCollection = await posts();

            const allPosts = await postCollection.find({}).toArray();

            return allPosts;
        } catch (err) {
            return err;
        }
    },

    async readPost(id) {
        try {
            if (!id) throw "You must provide an id to search for";
            if (typeof(id) != "string") {
                if (!(id instanceof ObjectID)) {
                    throw "Author must be of type string or ObjectID";
                }
            }

            const theId = new mongo.ObjectID(id);

            const postCollection = await posts();
            const post = await postCollection.findOne({ _id: theId });

            if (post === null) throw "No post with that id";
    
            return post;
        } catch (err) {
            return (err);
        }
    },

    async updatePost(id, title, author, content) {
        try {
            if (!id) throw "You must provide a post id";
            if (!title) throw "You must provide a title";
            if (!content) throw "You must provide a body";
            if (!author) throw "You must specify a poster";

            if (typeof(id) != "string") {
                if (!(id instanceof ObjectID)) {
                    throw "Author must be of type string or ObjectID";
                }
            }
            if (typeof(title) != "string" || typeof(content) != "string") {
                throw "Title and content must be of type string";
            }
            if (typeof(author) != "string") {
                if (!(author instanceof ObjectID)) {
                    throw "Author must be of type string or ObjectID";
                }
            }

            const theId = new mongo.ObjectID(id);
            const postCollection = await posts();
            const animalColl = await animalCollection();
            const animal = await animalColl.findOne( {_id: author} )

            let updatedPost = {
                title: title,
                content: content,
                author: {
                    "_id": author,
                    "name": animal.name
                },

            };
    
            const updatedInfo = await postCollection.replaceOne(
                { _id: theId },
                updatedPost
            );
            if (updatedInfo.modifiedCount === 0) {
            throw "could not update post successfully";
            }

            const finalPost = await this.readPost(theId);

            return finalPost
        } catch (err) {
            return err;
        }
    },

    async deletePost(id) {
       try {
           if (!id) throw "You must provide an id to search for";
            if (typeof(id) != "string") {
                if (!(id instanceof ObjectID)) {
                    throw "Author must be of type string or ObjectID";
                }
            }

            const theId = new mongo.ObjectID(id);
            const postCollection = await posts();
            const animalColl = await animalCollection();

            let postToDelete = await this.readPost(theId);
            let authorId = postToDelete.author._id;

            const theAuthorId = new mongo.ObjectID(authorId);

            let authorInfo = await animalColl.findOne( {_id: theAuthorId})

            const deletionInfo = await postCollection.removeOne({ _id: theId });
            if (deletionInfo.deletedCount == 0) throw `Could not delete animal with id of ${id}`;

            let postList = authorInfo.posts;
            for (var ind in postList) {
                var id = postList[ind]._id;
                if (id == theId) {
                    postList.splice(ind, 1)
                }
            }

            authorInfo.posts = postList
            const newAnimal = await animalColl.updateOne( {_id: theAuthorId} , {$set: authorInfo} );

            postToDelete.author = {
                "_id": authorId,
                "name": authorInfo.name
            }

            let disp = {
                deleted: true,
                data: {
                    "_id": postToDelete._id,
                    "title": postToDelete.title,
                    "content": postToDelete.content,
                    "author": {
                        "_id": authorInfo._id,
                        "name": authorInfo.name
                    }
                }
            }
        
            return disp;
       } catch (err) {
           return err;
       }
    }
};

module.exports = exportedMethods;