const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT

app.use(cors());
app.use(express.json());


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const postCollection = client.db('database').collection('posts');
    const userCollection = client.db('database').collection('users');

    // Get all posts
    app.get('/post', async (req, res) => {
      const post = (await postCollection.find().toArray()).reverse();
      res.send(post);
    });

    // Get all users
    app.get('/user', async (req, res) => {
      const user = await userCollection.find().toArray();
      res.send(user);
    });

    // Get a logged-in user
    app.get('/loggedInUser', async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.find({ email: email }).toArray();
      res.send(user);
    });

    // Get posts by a user
    app.get('/userPost', async (req, res) => {
      const email = req.query.email;
      const post = (await postCollection.find({ email: email }).toArray()).reverse();
      res.send(post);
    });

    // Add a post
    app.post('/post', async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    // Register a user
    app.post('/register', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // Update a user
    app.patch('/userUpdates/:email', async (req, res) => {
      const email = req.params.email;
      const profile = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

  } catch (error) {
    console.log(error);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from Twitter!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const app = express();
// const port =process.env.PORT ||5000;

// app.use(cors());
// app.use(express.json());


// const uri = "mongodb+srv://tina067:tina067@cluster0.e0o27eb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//     try{
//         await client.connect();
//         const postCollection = client.db('database').collection('posts') //this is post collection
//         const userCollection = client.db('database').collection('users')  //this is user collection

//         //get
//         app.get('/post', async (req, res) => {
//             const post = (await postCollection.find().toArray()).reverse();
//             res.send(post);
//         })
        
//         app.get('/user', async (req, res) => {
//             const user = await userCollection.find().toArray();
//             res.send(user);
//         })

//         app.get('/loggedInUser', async (req, res) => {
//             const email = req.query.email;
//             const user = await userCollection.find({email : email }).toArray();
//             res.send(user);
//         })

//         app.get('/userPost', async (req, res) => {
//             const email = req.query.email;
//             const userPost = (await postCollection.find({email : email }).toArray()).reverse();
//             res.send(userPost);
//         })

//         //post 
//         app.post('/post', async(req, res) =>{
//             const post = req.body;
//             const result = await postCollection.insertOne(post);
//             res.send(result);
//         })

//         app.post('/register', async(req, res) =>{
//             const user = req.body;
//             const result = await userCollection.insertOne(user);
//             res.send(result);
//         })

//         //patch 
//         app.patch('/userUpdates/:email', async (req, res) => {
//             const filter = req.params;
//             const profile = req.body;
//             const options = {upsert: true};
//             const updateDoc = { $set: profile};
//             const result = await userCollection.updateOne(filter, updateDoc, options)
//             res.send(result);
//         }) 

//     } catch (error) {
//         console.log(error);
//     }
// } run().catch(console.dir)

// app.get('/', (req, res) =>{
//     res.send('Hello from Twitter!')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// })