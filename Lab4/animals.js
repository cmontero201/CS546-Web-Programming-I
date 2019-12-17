const mongoCollections = require('./mongoCollections');
var mongo = require('mongodb');
const animals = mongoCollections.animals;


module.exports = {
    // TEST - OK
    async create(name, animalType) {
        checkName(name);
        checkName(animalType)

        if (!name || typeof(name) != "string") throw "A name of type string must be provided for your animal profile!";

        if (!animalType || typeof(animalType) != "string") throw "An animal type of type string must be provided for your animal profile";

        const animalCollection = await animals();

        let newAnimal = {
            "name" : name,
            "animalType" : animalType
        };

        const insertInfo = await animalCollection.insertOne(newAnimal);
        if (insertInfo.insertCoun == 0) throw "Unable to add animal";

        const newId = insertInfo.insertedId;

        const animal = await this.getId(newId);

        return animal;
    },

    // TEST - OK
    async getAll() {
        const animalCollection = await animals();

        const allAnimals = await animalCollection.find({}).toArray();

        return allAnimals;
    },

    // TEST - OK
    async getId(id) {
        checkID(id);

        if (!id) throw "An ID is required to search for an animal";

        const animalCollection = await animals();

        var theId = new mongo.ObjectID(id);

        const thisAnimal = await animalCollection.findOne({ _id: theId });
        if (thisAnimal === null) throw "There is no animal with that ID";
    
        return thisAnimal;
    },

    //TEST - OK
    async removeId(id) {
        checkID(id);        
        if (!id) throw "An ID is required to search for an animal";
        

        const animalCollection = await animals();

        var theId = new mongo.ObjectID(id);
        const deletionInfo = await animalCollection.removeOne({"_id": theId});

        if (deletionInfo.deletedCount == 0) throw `Could not delete animal with id of ${id}`;
    },

    // TEST - OK
    async rename(id, newName) {
        checkName(newName);
        checkID(id);
        if (!id) throw "An ID is required to search for an animal";

        if (!newName) throw "A name for your animal must be provided";
        if (typeof(newName) != "string") throw "Animal names must be of type string";

        const animalCollection = await animals();

        var theId = new mongo.ObjectID(id);
        const noUpdate = await this.getId(theId);
        
        const updatedAnimal = {
            "name" : newName,
            "animalType" : noUpdate.animalType
        };

        const updatedInfo = await animalCollection.updateOne({_id : theId}, {$set: updatedAnimal});


        if (updatedInfo.modifiedCount === 0) {
          throw 'could not update dog successfully';
        }

        return await this.getId(id)
    }
}


function checkName(name) {
    if (typeof(name) != "string") {
        throw "Names must be of type string"
    }
}

function checkID(id) {
    var type = typeof id;
    if (type == "string" || type == "object") {
        return true
    } else {
        throw "Type of ID must be number or object"
    }
}

