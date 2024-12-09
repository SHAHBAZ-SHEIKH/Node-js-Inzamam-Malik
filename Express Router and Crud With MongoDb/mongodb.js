import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// MongoDB URI from your .env file
const uri = process.env.MONGO; 
export const client = new MongoClient(uri);

async function connectDb() {
  try {
   
    await client.connect();
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err.stack);
    process.exit(1);  
  }
}

// Connect to the database
connectDb();

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("App is terminating...");
  await client.close();
  process.exit(0);
});
