// app/api/products/route.js
import { NextResponse } from "next/server";
import dbConnect, { collectionName } from "@/lib/dbConnect";

export async function GET() {
  try {
    // সরাসরি collection পেতে dbConnect ব্যবহার
    const productsCollection = await dbConnect(collectionName.products);

    // সব প্রোডাক্ট নিয়ে আসা
    const products = await productsCollection.find().toArray();

    // ObjectId কে string এ কনভার্ট করা
    const serializedProducts = products.map(({ _id, ...rest }) => ({
      _id: _id.toString(),
      ...rest,
    }));

    return NextResponse.json({ success: true, data: serializedProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
