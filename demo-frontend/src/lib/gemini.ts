import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function getRecommendations(userId: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const prompt = `Generate product recommendations for user ${userId} based on their purchase history and browsing behavior. Consider current inventory levels and market trends. Provide 5 recommendations in JSON format with product ID, name, and reason for recommendation.`

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  // Parse the JSON response
  const recommendations = JSON.parse(text)

  return recommendations
}