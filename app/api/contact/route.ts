import { NextRequest, NextResponse } from "next/server";

/**
 * Contact Form API Route
 * Handles POST requests from the contact form
 * Currently logs submissions to console (placeholder for email service integration)
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Log the submission to console
    console.log("=== New Contact Form Submission ===");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log("===================================");

    // TODO: In production, integrate with an email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    // Or save to a database

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll be in touch soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Handle GET requests (optional - for testing)
 */
export async function GET() {
  return NextResponse.json(
    {
      message: "Contact API endpoint is working. Use POST to submit form data.",
    },
    { status: 200 }
  );
}
