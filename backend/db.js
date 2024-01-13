
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uri = "mongodb+srv://gofood:gofood1234@cluster0.lnzad0l.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
    await mongoose.connect(uri, { dbName: 'gofoodmern' }).then(async (err, result) => {
        console.log("Connected to Mongo");
        const schema = new mongoose.Schema({});

        const mongoDataModel = mongoose.model('food_items', schema);
        //const mongoData = await mongoDataModel.findOne({ CategoryName: "Starter" }).then((err,mongoData) => {
        const mongoData = await mongoDataModel.find({}).then((mongoData) => {
            //console.log(mongoData);
            global.food_items = mongoData;
        }).catch((err) => {console.log(err)});

        const mongoDataModel2 = mongoose.model("food_categories", schema);
        const mongocatData = await mongoDataModel2.find({}).then((mongocatData) => {
            console.log('got data');
            global.foodCategory = mongocatData;
        }).catch((err) => {console.log(err)});

    }).catch((err) => {console.log("---", err)});
};

module.exports = mongoDB;



/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gofood:gofood1234@cluster0.lnzad0l.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const mongoDBF = async () => {
    async function run() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");

            const dbName = "gofoodmern";
            const collectionName = "food_items";

            const database = client.db(dbName);
            const collection = database.collection(collectionName);

            // We can also find a single document. Let's find the first document
            // that has the string "potato" in the ingredients list.
            const findOneQuery = { CategoryName: "Starter" };

            try {
                const findOneResult = await collection.findOne(findOneQuery);
                if (findOneResult === null) {
                    console.log("Couldn't find any recipes that contain 'potato' as an ingredient.\n");
                } else {
                    console.log(`Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
                }
            } catch (err) {
                console.error(`Something went wrong trying to find one document: ${err}\n`);
            }

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);


};

module.exports = mongoDBF;
*/