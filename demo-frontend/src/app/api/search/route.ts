// app/api/search/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Given the following user query for product features: "${query}"
      
      1. Analyze the query to identify key product features and requirements.
      2. Based on these features, recommend up to 5 optimal products that best match the criteria.
      3. For each product, provide the following information:
         - Product name
         - Brief description
         - Key features that match the query
         - A confidence score (0-100) indicating how well it matches the query
      
      Format the response as a JSON array of objects, each containing 'name', 'description', 'features', and 'confidenceScore' properties.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json\n/g, "").replace(/\n```/g, "");
    const products = JSON.parse(text);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to process search query" }, { status: 500 });
  }
}