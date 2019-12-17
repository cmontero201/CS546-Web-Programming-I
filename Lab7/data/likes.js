const mongoCollections = require("./collections");
const mongo = require('mongodb');
const { ObjectID } = require('mongodb');
const animals = mongoCollections.animals;
const posts = mongoCollections.posts;


let exportedMethods = {

    async like (id, postId) {
        try {
            if (!id || !postId) {
                throw "An animal ID and postID is required";
            }
            if (typeof(id) != "string") {
                if (!(id instanceof ObjectID)) {
                    throw "Provided animal ID must be of type string or ObjectID";
                }
            }
            if (typeof(postId) != "string") { 
                if (!(postId instanceof ObjectID)) {
                    throw "Provided post ID must be of type string or ObjectID";
                }
            }
    
            let animalCollection = await animals();
            let postCollection = await posts();

            let aId = new mongo.ObjectID(id);
            let pId = new mongo.ObjectID(postId);
            
            const checkAnimalExists = await animalCollection.findOne( {_id: aId} );
            if (checkAnimalExists == null) throw "There is no animal associated with the provided animal ID";

            const checkPostExists = await postCollection.findOne( {_id: pId} ); 
            if (checkPostExists == null) throw "There is no post associated with the provided post ID";
                       
            
            let updatedLikes = await animalCollection.updateOne(
                {"_id": aId},
                {$addToSet: {"likes" : pId}}
            );
    
            if (updatedLikes.result.n != 1) throw "Unable to like post";
    
            return  
        } catch (err) {
            return err;
        }     
    },

    async unlike (id, postId) {
       try {
           if (!id) throw "No id provided";
            if (!postId) throw "No post Id provided";
            if (typeof(id) != "string") { 
                if (!(id instanceof ObjectID)) {
                    throw "Provided ID must be of type string or ObjectID";
                }
            }

            if (typeof(postId) != "string") {
                if (!(id instanceof ObjectID)) {
                    throw "Provided ID must be of type string or ObjectID";
                }
            }

            const animalCollection = await animals();
            const postCollection = await posts();

            let aId = new mongo.ObjectID(id);
            let pId = new mongo.ObjectID(postId);

            const checkAnimalExists = await animalCollection.findOne( {_id: aId} );
            if (checkAnimalExists == null) throw "There is no animal associated with the provided animal ID";

            const checkPostExists = await postCollection.findOne( {_id: pId} );
            if (checkPostExists == null) throw "There is no post associated with the provided post ID";

    
            let updatedLikes = await animalCollection.updateOne(
                {"_id": aId},
                { $pull: { "likes": pId } }
            );
            
            if (updatedLikes.results.n != 1) throw "Unable to unlike post";

            return 
        } catch (err) {
           return err;
       }
    }
};

module.exports = exportedMethods;
      