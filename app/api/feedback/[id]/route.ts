import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { verifyToken } from "../../admin/auth/route";

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

// Read existing feedback
async function readFeedback(): Promise<Feedback[]> {
  try {
    const data = await readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write feedback to file
async function writeFeedback(feedback: Feedback[]): Promise<void> {
  await writeFile(DATA_FILE, JSON.stringify(feedback, null, 2));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const { status } = await request.json();

    // Validate status
    const validStatuses = ["new", "reviewed", "responded", "archived"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Read existing feedback
    const feedback = await readFeedback();
    
    // Find and update the feedback
    const feedbackIndex = feedback.findIndex(item => item.id === id);
    
    if (feedbackIndex === -1) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    // Update the status
    feedback[feedbackIndex] = {
      ...feedback[feedbackIndex],
      status: status as Feedback["status"]
    };

    // Write back to file
    await writeFeedback(feedback);

    return NextResponse.json({
      message: "Status updated successfully",
      feedback: feedback[feedbackIndex]
    });

  } catch (error) {
    console.error("Error updating feedback status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Read existing feedback
    const feedback = await readFeedback();
    
    // Find the feedback to delete
    const feedbackIndex = feedback.findIndex(item => item.id === id);
    
    if (feedbackIndex === -1) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    // Remove the feedback
    const deletedFeedback = feedback.splice(feedbackIndex, 1)[0];

    // Write back to file
    await writeFeedback(feedback);

    return NextResponse.json({
      message: "Feedback deleted successfully",
      feedback: deletedFeedback
    });

  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}