const dbConnection = require("../data/connection");
const data = require("../data/");
const animals = data.animals;
const posts = data.posts;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const scooter = await animals.create("Scooter", "Dog");  
  console.log(scooter)                                                                             
  const id = scooter._id;
         
  let x = await posts.createPost("Hello, everybody!", id, "I'm a good doggo!");    
                                                                                                                            
  await posts.createPost(
    "Using the seed",
    id,
    "We use the seed to have some initial data so we can just focus on servers this week"
  );                                                                                    

  await posts.createPost(
    "Using routes",
    id,
    "The purpose of today is to simply look at some GET routes"
  );
                                                                                     

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  console.log("Done seeding database");
  
  await db.serverConfig.close();
}

main();