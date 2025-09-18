"use server";
import dbConnect, { collectionName } from "../../../lib/dbConnect";

export const getProducts = async () => {
  try {
    const client = await dbConnect();
    const db = client.db(process.env.DB_NAME);

    const products = await db
      .collection(collectionName.products)
      .find({})
      .toArray();

    const plainProducts = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }));

    return plainProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
