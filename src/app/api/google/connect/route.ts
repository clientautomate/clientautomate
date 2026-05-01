import { google } from "googleapis";
import { NextResponse } from "next/server";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/api/google/callback`
);

export async function GET() {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/business.manage",
    ],
  });

  return NextResponse.redirect(url);
}
