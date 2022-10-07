const express = require("express");
const cors = require("cors");
const app = express();
const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB_URL;
const DB = "UserProduct";




//middleware
app.use(express.json());
app.use(
  cors({
    orgin: "http://localhost:3000",
  })
);

app.get("/getallusers", async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db(DB);
    let reUser = await db.collection("Users").find().toArray();
    await connection.close();
    res.json(reUser);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.post("/create-user", async function (req, res) {
  try {
    // step 1: Create a connection between NodeJS and MongoDB
    const connection = await mongoClient.connect(URL);
    // step 2: Select the DB
    const db = connection.db(DB);
    // step 3: Select the Collection
    // step 4: Do the Operation(Create,Update,Edit,Delete)
    await db.collection("Users").insertOne(req.body);
    // step 5: Close the Connection
    await connection.close();

    res.json({ message: "Data inserted" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.get("/viewuser/:id", async function (req, res) {
  try {
    // step 1: Create a connection between NodeJS and MongoDB
    const connection = await mongoClient.connect(URL);
    // step 2: Select the DB
    const db = connection.db(DB);
    // step 3: Select the Collection
    // step 4: Do the Operation(Create,Update,Edit,Delete)
    let user = await db
      .collection("Users")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    // step 5: Close the Connection
    await connection.close();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.put("/edituser/:id", async function (req, res) {
  try {
    // step 1: Create a connection between NodeJS and MongoDB
    const connection = await mongoClient.connect(URL);
    // step 2: Select the DB
    const db = connection.db(DB);
    // step 3: Select the Collection
    // step 4: Do the Operation(Create,Update,Edit,Delete)
    let user = await db
      .collection("Users")
      .findOneAndUpdate(
        { _id: mongodb.ObjectId(req.params.id) },
        { $set: req.body }
      );
    // step 5: Close the Connection
    await connection.close();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.delete("/deleteuser/:id", async function (req, res) {
  try {
    // step 1: Create a connection between NodeJS and MongoDB
    const connection = await mongoClient.connect(URL);
    // step 2: Select the DB
    const db = connection.db(DB);
    // step 3: Select the Collection
    // step 4: Do the Operation(Create,Update,Edit,Delete)
    let user = await db
      .collection("Users")
      .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });
    // step 5: Close the Connection
    await connection.close();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.get("/getallproducts", async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db(DB);
    let reUser = await db.collection("Products").find().toArray();
    await connection.close();
    res.json(reUser);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.post("/create-product", async function (req, res) {
  try {
    // step 1: Create a connection between NodeJS and MongoDB
    const connection = await mongoClient.connect(URL);
    // step 2: Select the DB
    const db = connection.db(DB);
    // step 3: Select the Collection
    // step 4: Do the Operation(Create,Update,Edit,Delete)
    await db.collection("Products").insertOne(req.body);
    // step 5: Close the Connection
    await connection.close();

    res.json({ message: "Data inserted" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.get("/viewproduct/:id", async function (req, res) {
  try {
    // step 1: Create a connection between NodeJS and MongoDB
    const connection = await mongoClient.connect(URL);
    // step 2: Select the DB
    const db = connection.db(DB);
    // step 3: Select the Collection
    // step 4: Do the Operation(Create,Update,Edit,Delete)
    let user = await db
      .collection("Products")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    // step 5: Close the Connection
    await connection.close();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.put("/editproduct/:id", async function (req, res) {
  try {
    // step 1: Create a connection between NodeJS and MongoDB
    const connection = await mongoClient.connect(URL);
    // step 2: Select the DB
    const db = connection.db(DB);
    // step 3: Select the Collection
    // step 4: Do the Operation(Create,Update,Edit,Delete)
    let user = await db
      .collection("Products")
      .findOneAndUpdate(
        { _id: mongodb.ObjectId(req.params.id) },
        { $set: req.body }
      );
    // step 5: Close the Connection
    await connection.close();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});


app.delete("/deleteproduct/:id", async function (req, res) {
  try {
    // step 1: Create a connection between NodeJS and MongoDB
    const connection = await mongoClient.connect(URL);
    // step 2: Select the DB
    const db = connection.db(DB);
    // step 3: Select the Collection
    // step 4: Do the Operation(Create,Update,Edit,Delete)
    let user = await db
      .collection("Products")
      .findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });
    // step 5: Close the Connection
    await connection.close();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});


app.post("/register", async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db(DB);

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash;
    await db.collection("Register").insertOne(req.body);

    await connection.close();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.post("/login", async function (req, res) {
  try {
    let connection = await mongoClient.connect(URL);
    let db = connection.db(DB);

    let user = await db.collection("Register").findOne({ email : req.body.email });
    if (user) {
      let compare = await bcrypt.compare(req.body.password, user.password);
    
      if (compare) {
        res.json({ message: "Logged in successfully" });
      } else {
        res.json({ message: "email or Password is wrong" });
      }

    } else {
      res.status(401).json({ message: "User email or password wrong" });
    }

  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.listen(process.env.PORT || 7000);