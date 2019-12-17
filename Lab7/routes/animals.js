const express = require("express");
const router = express.Router();
const { ObjectID } = require('mongodb');
const data = require("../data");
const animalData = data.animals;

// DONE
router.get("/", async (req, res) => {
    try {
      const animalList = await animalData.getAll();
      res.json(animalList);
    } catch (e) {
      res.sendStatus(500);
    }
});

// DONE
router.post("/", async (req, res) => {
    const animalInfo = req.body;

    if (!animalInfo) {
        res.status(400).json({ error: "You must provide data to create an animal" });
        return;
    }
    if (!animalInfo.name) {
        res.status(400).json({ error: "You must provide an animal name" });
        return;
    }
    if (!animalInfo.animalType) {
        res.status(400).json({ error: "You must provide an animal type" });
        return;
    }

    try {
        const addAnimal = await animalData.create(animalInfo.name, animalInfo.animalType);
        res.status(200).json(addAnimal)
    } catch (e) {
        res.status(400).json( {error : e} );
    }
});

// DONE
router.get("/:id", async (req, res) => {
    try {
        const animal = await animalData.getId(req.params.id);
        res.json(animal);
    } catch (e) {
        res.status(404).json( {error: "Animal with provided ID not found"} );
    }
});

// DONE
router.put("/:id", async (req, res) => {
    const animalInfo = req.body;

    if (!animalInfo) {
        res.status(400).json({ error: "You must provide data to create an animal" });
        return;
    }
    if (!animalInfo.newName && !animalInfo.newType) {
        res.status(400).json({ error: "You must provide either a new animal name or animal type" });
        return;
    }

    try {
        const animal = await animalData.getId(req.params.id);
    } catch (e) {
        res.status(404).json( {error: "Animal with provided ID not found"} );
    }

    try {
        const animal = await animalData.getId(req.params.id);
        if (!animalInfo.newName) {
            animalInfo.newName = undefined
            const animalUpdate = await animalData.update(req.params.id, animal.name, animalInfo.newType);
            res.json(animalUpdate);
        } else if (!animalInfo.newType) {
            animalInfo.newType = undefined
            const animalUpdate = await animalData.update(req.params.id, animalInfo.newName, animal.animalType);
            res.json(animalUpdate);
        } else {
            const animalUpdate = await animalData.update(req.params.id, animalInfo.newName, animalInfo.newType);
            res.json(animalUpdate);
        }
    } catch (e) {
        res.sendStatus(400);
    }
});

// DONE
router.delete("/:id", async (req, res) => {
    try {
        await animalData.getId(req.params.id);
    } catch (e) {
        res.status(404).json( {error: "Animal with provided ID not found"} );
        return;
    }

    try {
        const removedAnimal = await animalData.removeId(req.params.id);
        res.status(200).json(removedAnimal);
    } catch (e) {
        res.status(400).json( {error: e} );
        return;
    }

}); 

module.exports = router;