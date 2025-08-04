import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number;
  category: string;
  feedback: string;
  submittedAt: string;
  status: "new" | "reviewed" | "responded" | "archived";
}

const DATA_FILE = path.join(process.cwd(), "data", "feedback.json");

// Ensure directories exist
async function ensureDirectories() {
  const dataDir = path.dirname(DATA_FILE);
  
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

// Read existing feedback
async function readFeedback(): Promise<Feedback[]> {
  try {
    const { readFile } = await import("fs/promises");
    const data = await readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid, return empty array
    return [];
  }
}

// Write feedback to file
async function writeFeedback(feedback: Feedback[]): Promise<void> {
  const { writeFile } = await import("fs/promises");
  await writeFile(DATA_FILE, JSON.stringify(feedback, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    await ensureDirectories();
    
    const { name, email, rating, category, feedback } = await request.json();

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!feedback || feedback.trim().length < 10) {
      return NextResponse.json(
        { error: "Feedback must be at least 10 characters long" },
        { status: 400 }
      );
    }

    // Generate unique ID
    const id = `feedback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create feedback object
    const feedbackEntry: Feedback = {
      id,
      name: name.trim(),
      email: email.trim(),
      rating: parseInt(rating),
      category: category?.trim() || "",
      feedback: feedback.trim(),
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    // Read existing feedback and add new one
    const existingFeedback = await readFeedback();
    existingFeedback.unshift(feedbackEntry); // Add to beginning of array

    // Write back to file
    await writeFeedback(existingFeedback);

    return NextResponse.json(
      { message: "Feedback submitted successfully", id },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const rating = searchParams.get("rating");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    await ensureDirectories();
    let feedback = await readFeedback();

    // Filter by status if provided
    if (status && status !== "all") {
      feedback = feedback.filter(item => item.status === status);
    }

    // Filter by rating if provided
    if (rating && rating !== "all") {
      feedback = feedback.filter(item => item.rating === parseInt(rating));
    }

    // Filter by category if provided
    if (category && category !== "all") {
      feedback = feedback.filter(item => item.category === category);
    }

    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      feedback = feedback.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower) ||
        item.feedback.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(feedback);

  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}