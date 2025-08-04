import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { verifyToken } from "../../admin/auth/route";

interface BugReport {
  id: string;
  title: string;
  description: string;
  screenshotPath?: string;
  submittedAt: string;
  status: "new" | "in-progress" | "resolved" | "closed";
}

const DATA_FILE = path.join(process.cwd(), "data", "bug-reports.json");

// Read existing bug reports
async function readBugReports(): Promise<BugReport[]> {
  try {
    const data = await readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write bug reports to file
async function writeBugReports(reports: BugReport[]): Promise<void> {
  await writeFile(DATA_FILE, JSON.stringify(reports, null, 2));
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
    const validStatuses = ["new", "in-progress", "resolved", "closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Read existing reports
    const reports = await readBugReports();
    
    // Find and update the report
    const reportIndex = reports.findIndex(report => report.id === id);
    
    if (reportIndex === -1) {
      return NextResponse.json(
        { error: "Bug report not found" },
        { status: 404 }
      );
    }

    // Update the status
    reports[reportIndex] = {
      ...reports[reportIndex],
      status: status as BugReport["status"]
    };

    // Write back to file
    await writeBugReports(reports);

    return NextResponse.json({
      message: "Status updated successfully",
      report: reports[reportIndex]
    });

  } catch (error) {
    console.error("Error updating bug report status:", error);
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

    // Read existing reports
    const reports = await readBugReports();
    
    // Find the report to delete
    const reportIndex = reports.findIndex(report => report.id === id);
    
    if (reportIndex === -1) {
      return NextResponse.json(
        { error: "Bug report not found" },
        { status: 404 }
      );
    }

    // Remove the report
    const deletedReport = reports.splice(reportIndex, 1)[0];

    // Write back to file
    await writeBugReports(reports);

    return NextResponse.json({
      message: "Bug report deleted successfully",
      report: deletedReport
    });

  } catch (error) {
    console.error("Error deleting bug report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}