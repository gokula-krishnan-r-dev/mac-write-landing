import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

interface BugReport {
  id: string;
  title: string;
  description: string;
  screenshotPath?: string;
  submittedAt: string;
  status: "new" | "in-progress" | "resolved" | "closed";
}

const UPLOADS_DIR = path.join(process.cwd(), "public", "bug-reports");
const DATA_FILE = path.join(process.cwd(), "data", "bug-reports.json");

// Ensure directories exist
async function ensureDirectories() {
  const dataDir = path.dirname(DATA_FILE);
  
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
  
  if (!existsSync(UPLOADS_DIR)) {
    await mkdir(UPLOADS_DIR, { recursive: true });
  }
}

// Read existing bug reports
async function readBugReports(): Promise<BugReport[]> {
  try {
    const { readFile } = await import("fs/promises");
    const data = await readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid, return empty array
    return [];
  }
}

// Write bug reports to file
async function writeBugReports(reports: BugReport[]): Promise<void> {
  const { writeFile } = await import("fs/promises");
  await writeFile(DATA_FILE, JSON.stringify(reports, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    await ensureDirectories();
    
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const screenshot = formData.get("screenshot") as File | null;

    // Validate required fields
    if (!title || title.trim().length < 5) {
      return NextResponse.json(
        { error: "Title is required and must be at least 5 characters long" },
        { status: 400 }
      );
    }

    // Generate unique ID
    const id = `bug-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    let screenshotPath: string | undefined;

    // Handle screenshot upload
    if (screenshot && screenshot.size > 0) {
      const bytes = await screenshot.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Validate file size (5MB max)
      if (buffer.length > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Screenshot must be less than 5MB" },
          { status: 400 }
        );
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(screenshot.type)) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload a valid image file." },
          { status: 400 }
        );
      }

      // Generate filename with timestamp
      const extension = screenshot.name.split('.').pop() || 'png';
      const filename = `${id}.${extension}`;
      const filepath = path.join(UPLOADS_DIR, filename);

      await writeFile(filepath, buffer);
      screenshotPath = `/bug-reports/${filename}`;
    }

    // Create bug report object
    const bugReport: BugReport = {
      id,
      title: title.trim(),
      description: description?.trim() || "",
      screenshotPath,
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    // Read existing reports and add new one
    const existingReports = await readBugReports();
    existingReports.unshift(bugReport); // Add to beginning of array

    // Write back to file
    await writeBugReports(existingReports);

    return NextResponse.json(
      { message: "Bug report submitted successfully", id },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error submitting bug report:", error);
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
    const search = searchParams.get("search");

    await ensureDirectories();
    let reports = await readBugReports();

    // Filter by status if provided
    if (status && status !== "all") {
      reports = reports.filter(report => report.status === status);
    }

    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      reports = reports.filter(report => 
        report.title.toLowerCase().includes(searchLower) ||
        report.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(reports);

  } catch (error) {
    console.error("Error fetching bug reports:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}