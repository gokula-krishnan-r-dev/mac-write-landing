"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  Bug,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Image as ImageIcon,
  X,
  MessageSquare,
  Star
} from "lucide-react";

interface BugReport {
  id: string;
  title: string;
  description: string;
  screenshotPath?: string;
  submittedAt: string;
  status: "new" | "in-progress" | "resolved" | "closed";
}

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

interface User {
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<BugReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<BugReport[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
  const [activeTab, setActiveTab] = useState<"bugs" | "feedback">("bugs");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<BugReport | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showImageModal, setShowImageModal] = useState<string | null>(null);
  const router = useRouter();

  // Check authentication and load user data
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("admin_token");
      
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/admin/auth", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("admin_token");
          router.push("/admin/login");
          return;
        }

        const data = await response.json();
        setUser(data.user);
        await Promise.all([loadReports(), loadFeedback()]);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  // Load bug reports
  const loadReports = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/bug-reports");
      
      if (!response.ok) {
        throw new Error("Failed to load reports");
      }

      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Failed to load reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load feedback
  const loadFeedback = async () => {
    try {
      const response = await fetch("/api/feedback");
      
      if (!response.ok) {
        throw new Error("Failed to load feedback");
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error("Failed to load feedback:", error);
    }
  };

  // Filter reports based on search and status
  useEffect(() => {
    let filteredBugs = reports;

    // Filter by status
    if (statusFilter !== "all") {
      filteredBugs = filteredBugs.filter(report => report.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredBugs = filteredBugs.filter(report =>
        report.title.toLowerCase().includes(searchLower) ||
        report.description.toLowerCase().includes(searchLower) ||
        report.id.toLowerCase().includes(searchLower)
      );
    }

    setFilteredReports(filteredBugs);
  }, [reports, searchTerm, statusFilter]);

  // Filter feedback based on search and status
  useEffect(() => {
    let filteredFb = feedback;

    // Filter by status
    if (statusFilter !== "all") {
      filteredFb = filteredFb.filter(item => item.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredFb = filteredFb.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower) ||
        item.feedback.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
      );
    }

    setFilteredFeedback(filteredFb);
  }, [feedback, searchTerm, statusFilter]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const updateReportStatus = async (reportId: string, newStatus: BugReport["status"]) => {
    try {
      const token = localStorage.getItem("admin_token");
      
      const response = await fetch(`/api/bug-reports/${reportId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update local state
      const updatedReports = reports.map(report =>
        report.id === reportId ? { ...report, status: newStatus } : report
      );
      setReports(updatedReports);
      
      if (selectedReport?.id === reportId) {
        setSelectedReport({ ...selectedReport, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const updateFeedbackStatus = async (feedbackId: string, newStatus: Feedback["status"]) => {
    try {
      const token = localStorage.getItem("admin_token");
      
      const response = await fetch(`/api/feedback/${feedbackId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update local state
      const updatedFeedback = feedback.map(item =>
        item.id === feedbackId ? { ...item, status: newStatus } : item
      );
      setFeedback(updatedFeedback);
      
      if (selectedFeedback?.id === feedbackId) {
        setSelectedFeedback({ ...selectedFeedback, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update feedback status:", error);
      alert("Failed to update feedback status. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: BugReport["status"]) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "closed":
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Bug className="w-4 h-4" />;
    }
  };

  const getStatusBadgeClass = (status: BugReport["status"]) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getFeedbackStatusBadgeClass = (status: Feedback["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "reviewed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "responded":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const exportReports = () => {
    const csvContent = [
      ["ID", "Title", "Description", "Status", "Submitted At"].join(","),
      ...filteredReports.map(report => [
        report.id,
        `"${report.title}"`,
        `"${report.description}"`,
        report.status,
        report.submittedAt
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bug-reports-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportFeedback = () => {
    const csvContent = [
      ["ID", "Name", "Email", "Rating", "Category", "Feedback", "Status", "Submitted At"].join(","),
      ...filteredFeedback.map(item => [
        item.id,
        `"${item.name}"`,
        `"${item.email}"`,
        item.rating,
        `"${item.category}"`,
        `"${item.feedback}"`,
        item.status,
        item.submittedAt
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feedback-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#050505]">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Bug Reports Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user?.email}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted/20 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("bugs")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "bugs"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Bug Reports ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "feedback"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            User Feedback ({feedback.length})
          </button>
        </div>

        {/* Stats Cards */}
        {activeTab === "bugs" ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">{reports.length}</p>
                </div>
                <Bug className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New</p>
                  <p className="text-2xl font-bold text-red-600">
                    {reports.filter(r => r.status === "new").length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {reports.filter(r => r.status === "in-progress").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reports.filter(r => r.status === "resolved").length}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Feedback</p>
                  <p className="text-2xl font-bold">{feedback.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {feedback.length > 0 ? (feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length).toFixed(1) : "0"}⭐
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Feedback</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {feedback.filter(f => f.status === "new").length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">5-Star Reviews</p>
                  <p className="text-2xl font-bold text-green-600">
                    {feedback.filter(f => f.rating === 5).length}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              {activeTab === "bugs" ? (
                <>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </>
              ) : (
                <>
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="responded">Responded</option>
                  <option value="archived">Archived</option>
                </>
              )}
            </select>
            
            <Button variant="outline" onClick={activeTab === "bugs" ? exportReports : exportFeedback}>
              <Download className="w-4 h-4" />
              Export {activeTab === "bugs" ? "Reports" : "Feedback"}
            </Button>
          </div>
        </div>

        {/* Data List */}
        <div className="bg-card rounded-lg border overflow-hidden">
          {activeTab === "bugs" ? (
            filteredReports.length === 0 ? (
              <div className="p-8 text-center">
                <Bug className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No reports found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your filters" 
                    : "No bug reports have been submitted yet"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">ID</th>
                      <th className="text-left p-4 font-medium text-foreground">Title</th>
                      <th className="text-left p-4 font-medium text-foreground">Status</th>
                      <th className="text-left p-4 font-medium text-foreground">Submitted</th>
                      <th className="text-left p-4 font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="border-t border-border hover:bg-muted/20">
                        <td className="p-4">
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {report.id.slice(-8)}
                          </code>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground truncate max-w-xs">
                              {report.title}
                            </p>
                            {report.screenshotPath && (
                              <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(report.status)}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(report.status)}`}>
                              {report.status.replace("-", " ")}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {formatDate(report.submittedAt)}
                        </td>
                        <td className="p-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            filteredFeedback.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No feedback found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your filters" 
                    : "No user feedback has been submitted yet"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">ID</th>
                      <th className="text-left p-4 font-medium text-foreground">Name</th>
                      <th className="text-left p-4 font-medium text-foreground">Rating</th>
                      <th className="text-left p-4 font-medium text-foreground">Category</th>
                      <th className="text-left p-4 font-medium text-foreground">Status</th>
                      <th className="text-left p-4 font-medium text-foreground">Submitted</th>
                      <th className="text-left p-4 font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFeedback.map((item) => (
                      <tr key={item.id} className="border-t border-border hover:bg-muted/20">
                        <td className="p-4">
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {item.id.slice(-8)}
                          </code>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.email}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-sm text-muted-foreground">({item.rating})</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">
                            {item.category || "General"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFeedbackStatusBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {formatDate(item.submittedAt)}
                        </td>
                        <td className="p-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedFeedback(item)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Bug Report Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedReport(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* ID and Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Report ID</p>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{selectedReport.id}</code>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedReport.status}
                      onChange={(e) => updateReportStatus(selectedReport.id, e.target.value as BugReport["status"])}
                      className="px-3 py-1 border rounded bg-background text-foreground"
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Title</p>
                  <h3 className="text-lg font-medium text-foreground">{selectedReport.title}</h3>
                </div>

                {/* Description */}
                {selectedReport.description && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-foreground whitespace-pre-wrap">{selectedReport.description}</p>
                    </div>
                  </div>
                )}

                {/* Screenshot */}
                {selectedReport.screenshotPath && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Screenshot</p>
                    <div 
                      className="border rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setShowImageModal(selectedReport.screenshotPath!)}
                    >
                      <img
                        src={selectedReport.screenshotPath}
                        alt="Bug screenshot"
                        className="w-full h-auto max-h-64 object-contain bg-muted/20"
                      />
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Submitted: {formatDate(selectedReport.submittedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Feedback Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFeedback(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* User Info and Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Feedback ID</p>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{selectedFeedback.id}</code>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedFeedback.status}
                      onChange={(e) => updateFeedbackStatus(selectedFeedback.id, e.target.value as Feedback["status"])}
                      className="px-3 py-1 border rounded bg-background text-foreground"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* User Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Name</p>
                    <p className="font-medium text-foreground">{selectedFeedback.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Email</p>
                    <p className="text-foreground">{selectedFeedback.email}</p>
                  </div>
                </div>

                {/* Rating and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Rating</p>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < selectedFeedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-medium">({selectedFeedback.rating}/5)</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Category</p>
                    <p className="text-foreground">{selectedFeedback.category || "General"}</p>
                  </div>
                </div>

                {/* Feedback Content */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Feedback</p>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-foreground whitespace-pre-wrap">{selectedFeedback.feedback}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Submitted: {formatDate(selectedFeedback.submittedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white z-10"
            >
              <X className="w-4 h-4" />
            </Button>
            <img
              src={showImageModal}
              alt="Bug screenshot"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}