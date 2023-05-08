const { MongoClient, ServerApiVersion } = require('mongodb');
async function connectToMongoDB(userDetails) {
    const uri = `mongodb+srv://ashutoshkumarsingh02032005:${process.env.MONGO_DB_PASSWORD}@registeredusers.zsfgp5n.mongodb.net/?retryWrites=true&w=majority`;
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    try {
      await client.connect();
      console.log("connected to MongoDB");
      await registerNewUser(client,userDetails);
      
    } catch (error) {
      console.log(error);
    } finally{
      await client.close();
    }
  
}


async function registerNewUser(client,newUser) {
   const result=await client.db("Sbte-Bihar").collection("RegisteredUsers")
   .insertOne(newUser);
   console.log(`new user registered with id ${result.insertedId}`);
}

module.exports= connectToMongoDB;

