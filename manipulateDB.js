const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://869248493:wyz19981206@cluster0.wutkvgh.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set tshe Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    await client.db("admin").command({
      renameCollection: "PersonalWebsite.project",
      to: "PersonalWebsite.projects",
      dropTarget: false,
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
