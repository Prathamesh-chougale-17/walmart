import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGlobalProducts } from "@/contexts/StoreContext";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a helpful shopping assistant for WalmartAi. 
      Answer the following customer query: "${message}".
      Provide helpful, concise information about products, pricing, or shopping advice.
      Suggest relevant products from the following list or recommend your own products based on the query Keep the response under 100 words.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json\n/g, "").replace(/\n```/g, "");

    const secondPrompt = `
    Generate product recommendations from text ${text}. Consider current inventory levels and market trends. Provide 5 more recommendations in JSON format with product "id", "name", "price" and "image".
  `;

  const secondResult = await model.generateContent(secondPrompt);
  const secondResponse = secondResult.response;
  const resultJson = secondResponse.text().replace(/```json\n/g, "").replace(/\n```/g, "").replace(/```JSON\n/g, "").replace(/```/g, "").replace(/JSON\n/g, "");
  const recommendations = JSON.parse(resultJson)

  const formattedSuggestions = recommendations.map((product: { id: string; name: string; image: string; price: number }) => ({
    id: product.id,
    name: product.name,
    image: product.image, // Assuming the 'image' in your state matches 'photo_url' from the response
    price: product.price,
    relevance: 1, // Initial relevance, can be adjusted as needed
  }));
  return NextResponse.json({ message: text,recommendations: formattedSuggestions });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 });
  }
}
