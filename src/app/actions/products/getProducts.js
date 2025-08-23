"use server";
import dbConnect from "../../../lib/dbConnect";
import { collectionName } from "../../../lib/dbConnect";

export const getProducts = async () => {
  try {
    const db = await dbConnect();
    const products = await db
      .collection(collectionNames.product)
      .find({})
      .toArray();

    // এখানে _id কে string এ convert করা হলো
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
