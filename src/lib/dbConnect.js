// lib/dbConnect.js
import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNames = {
    user: "user",
    products: "products"
}


const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let cachedClient = null;
let cachedDb = null;

async function dbConnect(collectionName) {
  if (cachedClient && cachedDb) {
    console.log("Using cached database connection");
    return cachedDb.collection(collectionName);
  }

  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    
    const db = client.db(process.env.DB_NAME);
    
    // Cache the connection
    cachedClient = client;
    cachedDb = db;
    
    console.log("MongoDB connected successfully");
    return db.collection(collectionName);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}

export default dbConnect;