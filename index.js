// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config()
// const app = express();
// const port = process.env.PORT

// app.use(cors());
// app.use(express.json());


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();
//     const postCollection = client.db('database').collection('posts');
//     const userCollection = client.db('database').collection('users');

//     // Get all posts
//     app.get('/post', async (req, res) => {
//       const post = (await postCollection.find().toArray()).reverse();
//       res.send(post);
//     });

//     // Get all users
//     app.get('/user', async (req, res) => {
//       const user = await userCollection.find().toArray();
//       res.send(user);
//     });

//     // Get a logged-in user
//     app.get('/loggedInUser', async (req, res) => {
//       const email = req.query.email;
//       const user = await userCollection.find({ email: email }).toArray();
//       res.send(user);
//     });

//     // Get posts by a user
//     app.get('/userPost', async (req, res) => {
//       const email = req.query.email;
//       const post = (await postCollection.find({ email: email }).toArray()).reverse();
//       res.send(post);
//     });

//     // Add a post
//     app.post('/post', async (req, res) => {
//       const post = req.body;
//       const result = await postCollection.insertOne(post);
//       res.send(result);
//     });

//     // Register a user
//     app.post('/register', async (req, res) => {
//       const user = req.body;
//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     });

//     // Update a user
//     app.patch('/userUpdates/:email', async (req, res) => {
//       const email = req.params.email;
//       const profile = req.body;
//       const filter = { email: email };
//       const options = { upsert: true };
//       const updateDoc = { $set: profile };
//       const result = await userCollection.updateOne(filter, updateDoc, options);
//       res.send(result);
//     });

//   } catch (error) {
//     console.log(error);
//   }
// }

// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Hello from Twitter!');
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });




// second version
// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const multer = require('multer');
// const nodemailer = require('nodemailer');
// require('dotenv').config();
// const app = express();
// const port = process.env.PORT;


// // app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow requests from your frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());

// const otpRouter = require('./routes/otp');
// app.use('/api/otp', otpRouter);

// // Set up Multer storage
// const path = require('path');

// // Set up Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'uploads')); // Ensure this path is correct
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
//   fileFilter: function (req, file, cb) {
//     const filetypes = /mp4|avi|mov|mkv/; // Allowed video formats
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Invalid file type'));
//   }
// });

// // Set up Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD
//   }
// });

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();
//     const postCollection = client.db('database').collection('posts');
//     const userCollection = client.db('database').collection('users');

//     // Get all posts
//     app.get('/post', async (req, res) => {
//       const post = (await postCollection.find().toArray()).reverse();
//       res.send(post);
//     });

//     // Get all users
//     app.get('/user', async (req, res) => {
//       const user = await userCollection.find().toArray();
//       res.send(user);
//     });

//     // Get a logged-in user
//     app.get('/loggedInUser', async (req, res) => {
//       const email = req.query.email;
//       const user = await userCollection.find({ email: email }).toArray();
//       res.send(user);
//     });

//     // Get posts by a user
//     app.get('/userPost', async (req, res) => {
//       const email = req.query.email;
//       const post = (await postCollection.find({ email: email }).toArray()).reverse();
//       res.send(post);
//     });

//     // Add a post
//     app.post('/post', async (req, res) => {
//       const post = req.body;
//       const result = await postCollection.insertOne(post);
//       res.send(result);
//     });

//     // Register a user
//     app.post('/register', async (req, res) => {
//       const user = req.body;
//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     });

//     // Update a user
//     app.patch('/userUpdates/:email', async (req, res) => {
//       const email = req.params.email;
//       const profile = req.body;
//       const filter = { email: email };
//       const options = { upsert: true };
//       const updateDoc = { $set: profile };
//       const result = await userCollection.updateOne(filter, updateDoc, options);
//       res.send(result);
//     });

//     // Send OTP for video upload authentication
//     app.post('/sendOtp', async (req, res) => {
//       const { email } = req.body;
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();

//       // Save OTP to user's collection
//       const filter = { email: email };
//       const updateDoc = { $set: { otp: otp } };
//       await userCollection.updateOne(filter, updateDoc);

//       // Send OTP email
//       const mailOptions = {
//         from: process.env.EMAIL,
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}`
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           return res.status(500).send(error.toString());
//         }
//         res.send('OTP sent: ' + info.response);
//       });
//     });

//     // Upload video
//     app.post('/uploadVideo', upload.single('video'), (req, res, next) => {
//       console.log("Multer File Handling");
//       console.log("req.file:", req.file);
//       console.log("req.body:", req.body);
//       next();
//     }, async (req, res) => {
//       const email = req.body.email;
//       const otp = req.body.otp;
    
//       console.log('Received Email:', email);
//       console.log('Received OTP:', otp);
    
//       const user = await userCollection.findOne({ email: email });
//       console.log('Retrieved User:', user);
    
//       if (!user) {
//         return res.status(400).send('User not found');
//       }
    
//       if (user.otp !== otp) {
//         return res.status(400).send('Invalid OTP');
//       }
    
//       if (!req.file) {
//         return res.status(400).send('No file uploaded');
//       }
    
//       const videoPost = {
//         email: email,
//         videoPath: req.file.path,
//         createdAt: new Date(),
//         upvotes: 1
//       };
    
//       const result = await postCollection.insertOne(videoPost);
//       res.send(result);
//     });
    

//   } catch (error) {
//     console.log(error);
//   }
// }

// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Hello from Twitter!');
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });



//third version
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const multer = require('multer');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const otpRouter = require('./routes/otp');
const port = process.env.PORT;

// app.use(cors({
//   origin: ['http://localhost:3000', 'https://twitter-application-d2-frontend-u9u4.vercel.app/'],  // Allow requests from your frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(cors({
  origin: ['http://localhost:3000', 'https://twitter-application-d2-frontend-u9u4.vercel.app','https://twitter-application-d2-frontend-33tt.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/otp', otpRouter);

const otps = {};

const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex');
};

// Set up Multer storage
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Ensure this path is correct
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /mp4|avi|mov|mkv/; // Allowed video formats
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type'));
  }
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

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

    // Send OTP for video upload authentication
    app.post('/sendOtp', async (req, res) => {
      const { email } = req.body;
      const otp = generateOTP();
      otps[email] = otp;

      // Save OTP to user's collection
      const filter = { email: email };
      const updateDoc = { $set: { otp: otp } };
      await userCollection.updateOne(filter, updateDoc);

      // Send OTP email
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.send('OTP sent: ' + info.response);
      });
    });

    // Verify OTP
    // app.post('/verifyOtp', (req, res) => {
    //   const { email, otp } = req.body;
    //   if (otps[email] && otps[email] === otp) {
    //     delete otps[email];
    //     res.status(200).send('OTP verified');
    //   } else {
    //     res.status(400).send('Invalid OTP');
    //   }
    // });

    app.post('/verifyOtp', (req, res) => {
      const { email, otp } = req.body;
      if (otps[email] && otps[email] === otp) {
          delete otps[email];
          res.status(200).json({ success: true, message: 'OTP verified' });
      } else {
          res.status(400).json({ success: false, message: 'Invalid OTP' });
      }
  });
  

    // Upload video
    app.post('/uploadVideo', upload.single('video'), (req, res, next) => {
      console.log("Multer File Handling");
      console.log("req.file:", req.file);
      console.log("req.body:", req.body);
      next();
    }, async (req, res) => {
      const email = req.body.email;
      const otp = req.body.otp;
    
      console.log('Received Email:', email);
      console.log('Received OTP:', otp);
    
      const user = await userCollection.findOne({ email: email });
      console.log('Retrieved User:', user);
    
      if (!user) {
        return res.status(400).send('User not found');
      }
    
      if (user.otp !== otp) {
        return res.status(400).send('Invalid OTP');
      }
    
      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }
    
      const videoPost = {
        email: email,
        videoPath: req.file.path,
        createdAt: new Date(),
        upvotes: 1
      };
    
      const result = await postCollection.insertOne(videoPost);
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
