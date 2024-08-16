import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a helpful shopping assistant for WalmartClone. 
      Answer the following customer query: "${message}"
      Provide helpful, concise information about products, pricing, or shopping advice.
      If asked about specific products, suggest alternatives or complementary items.
      Keep the response under 100 words.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json\n/g, "").replace(/\n```/g, "");

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 });
  }
}