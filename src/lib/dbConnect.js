import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionName = {
  products: "products",
  users: "users",
};

let client;
let clientPromise;

if (!process.env.NEXT_PUBLIC_MONGODB_URL) {
  throw new Error("Please add your MongoDB URI to .env");
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URL;

if (process.env.NODE_ENV === "development") {
  // Dev: use global variable to avoid multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1 } });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Prod: new connection
  client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1 } });
  clientPromise = client.connect();
}

export default async function dbConnect(collection) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  return db.collection(collection);
}
