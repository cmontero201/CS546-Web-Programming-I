const mongoCollections = require('./collections');
const mongo = require('mongodb');
const { ObjectID } = require('mongodb');
const animals = mongoCollections.animals;
const posts = mongoCollections.posts;


let exportedMethods = {
    async create(name, animalType) {
        try {
            if (!name || typeof(name) != "string") throw "A name of type string must be provided for your animal profile!";

            if (!animalType || typeof(animalType) != "string") throw "An animal type of type string must be provided for your animal profile";

            const animalCollection = await animals();
            if (animalCollection == null) throw "Unable to get Animals";
            
            const postCollection = await posts();
            if (postCollection == null) throw "Unable to get Posts";

            let newAnimal = {
                "name" : name,
                "animalType" : animalType,
                "likes" : []
            };

            const insertInfo = await animalCollection.insertOne(newAnimal);
            if (insertInfo.insertCount == 0) throw "Unable to add animal";

            const newId = insertInfo.insertedId;

            const postsAuthoredById = await postCollection.find({ _id: newId}).toArray();
            if (postsAuthoredById == null) throw "Unable to get post(s)";

            const animal = await this.getId(newId);
            if (animal == null) throw "Unable to get Animal";

            
            animal.posts = postsAuthoredById
            const finalAnimal = await animalCollection.updateOne( {_id: newId}, {$set: animal} );
            if (finalAnimal == null) throw "Unable to update Animal";
            
            return animal;
        } catch (err) {
            return err;
        }
    },

    async getAll() {
        try {
            const animalCollection = await animals();
            if (animalCollection == null) throw "Unable to get Animals";

            const allAnimals = await animalCollection.find({}).toArray();
            if (allAnimals == null) throw "Unable to get Animals";

            return allAnimals;
        } catch (err) {
            return err;
        }
        
    },

    async getId(id) {
        try {
            if (!id) throw "An ID is required to search for an animal";
            if (typeof(id) != "string") {
                if (!(id instanceof ObjectID)) {
                    throw "Provided animal ID must be of type string or ObjectID";
                }
            }

            const theId = new mongo.ObjectID(id);
            const animalCollection = await animals();
            if (animalCollection == null) throw "Unable to get Animals";

            const checkAnimalExists = await animalCollection.findOne( {_id: theId} );
            if (checkAnimalExists == null) throw "There is no animal associated with the provided animal ID";
            
            const thisAnimal = await animalCollection.findOne({ _id: theId });
            if (thisAnimal === null) throw "There is no animal with that ID";
        
            return thisAnimal;

        } catch (err) {
            return err;
        }
    },

    async removeId(id) {
        try {
            if (!id) throw "An ID is required to search for an animal";

            if (typeof(id) != "string") {
                if (!(id instanceof ObjectID)) {
                    throw "Provided animal ID must be of type string or ObjectID";
                }
            }

            const theId = new mongo.ObjectID(id);
        
            const animalCollection = await animals();
            const postCollection = await posts();
            const checkAnimalExists = await animalCollection.findOne( {_id: theId} );

            if (checkAnimalExists == null) throw "There is no animal associated with the provided animal ID";
      
            if (checkAnimalExists.posts.length != 0) {
                let postList = checkAnimalExists.posts;
                for (var ind in postList) {
                    var postId = postList[ind]._id;
                    const removeId = new mongo.ObjectID(postId);
                    
                    try {
                        var thisT = await postCollection.removeOne({ _id: removeId });
                        if (thisT.deletedCount == 0) throw `Could not delete posts associated with animal with id of ${id}`;
                    } catch (err) {
                        throw err;
                    }
                }
            }

            const deletionInfo = await animalCollection.removeOne( {"_id": theId} );
            if (deletionInfo.deletedCount == 0) throw `Could not delete animal with id of ${id}`;

            deleteInfo = {
                deleted: "true",
                data: checkAnimalExists
            };

            return deleteInfo;
        } catch (err) {
            return err;
        }
    },

    async update(id, newName, newType) {
        try {
            if (!id) throw "An ID is required to search for an animal";
            if (!newName) {
                newName = undefined;
            }
            if (!newType) {
                newType = undefined;
            }
            if (!newName && !newType) throw "An updated name or type for your animal must be provided";
    
    
            if (typeof(id) != "string")  {
                if (!(id instanceof ObjectID)) {
                    throw "Provided animal ID must be of type string or ObjectID";
                }
            }
            if (typeof(newName) != "string" || typeof(newName) == "undefined") throw "Animal names must be of type string";
            if (typeof(newType) != "string" || typeof(newType) == "undefined") throw "Animal types must be of type string";
    
            var theId = new mongo.ObjectID(id);
    
            const animalCollection = await animals();
            if (animalCollection == null) throw "Unable to get Animals";

            const checkAnimalExists = await animalCollection.findOne( {_id: theId} );
            if (checkAnimalExists == null) throw "There is no animal associated with the provided animal ID";
    
            const noUpdate = await this.getId(theId);
            if (noUpdate == null) throw "Unable to get Animal";
            
            if (!newName) {
                const updatedAnimal = {
                    "name" : noUpdate.name,
                    "animalType" : newType
                };
    
                const updatedInfo = await animalCollection.updateOne({_id : theId}, {$set: updatedAnimal});
                if (updatedInfo.modifiedCount === 0) throw 'could not update dog successfully';

                let inf = await this.getId(id);
                if (inf == null) throw "Unable to complete update";
                
                return inf;
            } else if (!newType) {
                const updatedAnimal = {
                    "name" : newName,
                    "animalType" : noUpdate.animalType
                };
    
                const updatedInfo = await animalCollection.updateOne({_id : theId}, {$set: updatedAnimal});
                if (updatedInfo.modifiedCount === 0) throw 'could not update dog successfully';
                
                let inf = await this.getId(id)
                if (inf == null) throw "Unable to complete update";
        
                return inf;
            } else {
                const updatedAnimal = {
                    "name" : newName,
                    "animalType" : newType
                };
    
                const updatedInfo = await animalCollection.updateOne({_id : theId}, {$set: updatedAnimal});
                if (updatedInfo.modifiedCount === 0) throw 'could not update dog successfully';

                let inf = await this.getId(id)
                if (inf == null) throw "Unable to complete update";

                return inf;
            }
        } catch (err) {
            return err;
        }
    } 
};

module.exports = exportedMethods;










