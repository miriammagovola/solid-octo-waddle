import express from "express";
import * as dotenv from "dotenv";
import { connectToDatabase } from "./src/database";
import { collections } from "./src/database";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to get all blood pressure readings
app.get('/bloodpressure', async (req, res) => {
  try {
    const results = await collections.bloodpressure?.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send('Error fetching blood pressure readings');
  }
});

// Route to add a new blood pressure reading
app.post('/bloodpressure', async (req, res) => {
  try {
    const newReading = req.body;
    const result = await collections.bloodpressure?.insertOne(newReading);
    result
      ? res.status(201).send(`Successfully created a new reading with id ${result.insertedId}`)
      : res.status(500).send('Failed to create a new reading.');
  } catch (error) {
    res.status(400).send('Error creating new reading');
  }
});

// Start the server
app.listen(port, async () => {
  try {
    await connectToDatabase(process.env.MONGODB_URI || '');
    console.log(`Server running at http://localhost:3000`);
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
});
  