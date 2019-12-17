/*


Remove Lucy
Query all animals, and log them all
*/

const connection = require('./mongoConnection');
const animals = require('./animals');



async function main() {
    // const sasha = await animals.create("Sasha", "Dog");
    // console.log("Sasha the dog has been added");
    // console.log(sasha);
    // console.log(typeof(sasha._id));
    // console.log("\n");

    // const lucy = await animals.create("Lucy", "Dog");
    // console.log("Lucy the dog has been added");
    // console.log(lucy);
    // console.log("\n");

    // const allAnimals = await animals.getAll();
    // console.log(allAnimals);
    // console.log("\n");

    // const duke = await animals.create("Duke", "Walrus");
    // console.log("Duke has been added");
    // console.log(duke);
    // console.log("\n");

    const getting = await animals.getId("5d13d51fc60ce27a76212177");
    console.log(getting);
    console.log("\n");

    // const getting2 = await animals.getId(223);
    // console.log(getting2);
    // console.log("\n");

    // const newSasha = await animals.rename("5d13d51fc60ce27a76212177", "Sashita");
    // console.log("Sasha has been renamed to Sashita");
    // console.log(newSasha);
    // console.log("\n");

    // const rem = await animals.removeId("5d13d51fc60ce27a76212178");
    // console.log("The animal with the requested ID has been removed");
    // console.log(rem);
    // console.log("\n");

    // const allAnimals2 = await animals.getAll();
    // console.log(allAnimals2);
    // console.log("\n");


    close()

    console.log('Done!');
}

async function close() {
  const db = await connection();
  await db.serverConfig.close();
}

main().catch((error) => {
    console.log(error);
    close()
  });

// MONGODB MONITORING
// https://cloud.mongodb.com/freemonitoring/cluster/K2ZDKGMPCJAHLFXJXVHVS76KFEGJ7BX2