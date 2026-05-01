import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { reviewerName, rating, comment } = await req.json();

  const tone = rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative";

  const prompt = `You are a professional UK business owner responding to a Google review. Write a response that is warm, natural, and in British English. Never sound corporate or robotic.

Review details:
- Reviewer: ${reviewerName}
- Rating: ${rating}/5 stars
- Comment: "${comment}"

Guidelines:
- For positive reviews (4-5 stars): Thank them warmly, mention something specific from their review, invite them back.
- For negative reviews (1-2 stars): Apologise sincerely, acknowledge the specific issue, offer to resolve it, provide contact details or invite them to return.
- For neutral reviews (3 stars): Thank them, acknowledge what could be improved, show commitment to doing better.
- Keep it concise (3-5 sentences max).
- Start with "Dear ${reviewerName}," or "Thank you ${reviewerName},"
- Sign off with "Kind regards, The Team"

Write only the response text, nothing else.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  const response = message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ response });
}
