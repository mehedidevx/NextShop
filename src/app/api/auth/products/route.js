import dbConnect, { collectionName } from "@/lib/dbConnect";

export async function GET() {
  try {
    const products = await dbConnect(collectionName.products).find({}).toArray();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
