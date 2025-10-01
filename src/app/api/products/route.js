// app/api/products/route.js
import { NextResponse } from "next/server";
import dbConnect, { collectionName } from "@/lib/dbConnect";

export async function GET() {
  try {
    const db = await dbConnect();
    const productsCollection = db.collection(collectionName.products);

    const products = await productsCollection.find().toArray();

    const serializedProducts = products.map(({ _id, ...rest }) => ({
      _id: _id.toString(),
      ...rest,
    }));

    return NextResponse.json({ success: true, data: serializedProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
