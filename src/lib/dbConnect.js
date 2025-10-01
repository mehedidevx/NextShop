import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionName = {
  products: "products",
  users: "users",
};

let client;
let clientPromise;
let db;

if (!process.env.NEXT_PUBLIC_MONGODB_URL) {
  throw new Error("Please add your MongoDB URI to .env");
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URL;

// Initialize connection once
if (!clientPromise) {
  client = new MongoClient(uri, { 
    serverApi: { 
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true 
    } 
  });
  
  clientPromise = client.connect().then((client) => {
    db = client.db(process.env.DB_NAME);
    return db;
  });

  // For development, cache the connection
  if (process.env.NODE_ENV === "development") {
    global._mongoClientPromise = clientPromise;
  }
}

export default async function dbConnect() {
  try {
    const database = await clientPromise;
    return database;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

// Specific collection এর জন্য helper function
export async function getCollection(collectionName) {
  const db = await dbConnect();
  return db.collection(collectionName);
}