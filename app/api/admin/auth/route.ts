import { NextRequest, NextResponse } from "next/server";
import { generateToken, verifyToken } from "../../../../lib/auth";

// Demo admin credentials - in production, use proper user management
const ADMIN_CREDENTIALS = {
  email: "admin@macwrite.ai",
  password: "admin123", // In production, use hashed passwords
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check credentials
    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate token
    const token = await generateToken(email);

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        email,
        role: "admin",
      },
    });

  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        email: payload.email,
        role: payload.role,
      },
    });

  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}