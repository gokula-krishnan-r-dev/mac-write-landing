"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, X, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface FormData {
  title: string;
  description: string;
  screenshot: File | null;
}

interface FormErrors {
  title?: string;
  description?: string;
  screenshot?: string;
}

export default function BugReportPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    screenshot: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Bug title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = "Description must not exceed 1000 characters";
    }

    if (formData.screenshot && formData.screenshot.size > 5 * 1024 * 1024) {
      newErrors.screenshot = "Screenshot must be less than 5MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      if (formData.screenshot) {
        submitData.append("screenshot", formData.screenshot);
      }

      const response = await fetch("/api/bug-reports", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit bug report");
      }

      setSubmitted(true);
      setFormData({ title: "", description: "", screenshot: null });
    } catch (error) {
      console.error("Error submitting bug report:", error);
      setErrors({ title: "Failed to submit bug report. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      setErrors({ screenshot: "Please upload a valid image file (JPG, PNG, GIF, or WebP)" });
      return;
    }

    setFormData({ ...formData, screenshot: file });
    setErrors({ ...errors, screenshot: undefined });
  };

  const removeScreenshot = () => {
    setFormData({ ...formData, screenshot: null });
    setErrors({ ...errors, screenshot: undefined });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background dark:bg-[#050505] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Bug Report Submitted!</h1>
            <p className="text-muted-foreground">
              Thank you for your feedback. We'll review your bug report and get back to you if needed.
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={() => setSubmitted(false)}
              variant="outline"
            >
              Submit Another Report
            </Button>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#050505]">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Report a Bug</h1>
            <p className="text-muted-foreground mt-1">
              Help us improve Macwrite by reporting issues you encounter
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bug Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Bug Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Brief description of the bug"
              className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.title ? "border-red-500" : "border-border"
              }`}
            />
            {errors.title && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide additional details about the bug, steps to reproduce, expected behavior, etc."
              rows={6}
              className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical ${
                errors.description ? "border-red-500" : "border-border"
              }`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formData.description.length}/1000 characters</span>
              {errors.description && (
                <span className="text-red-500">{errors.description}</span>
              )}
            </div>
          </div>

          {/* Screenshot Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Screenshot (Optional)
            </label>
            
            {formData.screenshot ? (
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{formData.screenshot.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(formData.screenshot.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeScreenshot}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-foreground mb-1">
                  Drag and drop a screenshot here, or{" "}
                  <label htmlFor="screenshot" className="text-primary cursor-pointer hover:underline">
                    browse files
                  </label>
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF, or WebP up to 5MB
                </p>
                <input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  className="hidden"
                />
              </div>
            )}
            
            {errors.screenshot && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="w-4 h-4" />
                {errors.screenshot}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Bug Report"}
          </Button>
        </form>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="text-sm font-medium text-foreground mb-2">Tips for effective bug reports:</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Be specific about what you were doing when the bug occurred</li>
            <li>• Include steps to reproduce the issue</li>
            <li>• Mention your macOS version and Macwrite version</li>
            <li>• Screenshots help us understand the issue better</li>
          </ul>
        </div>
      </div>
    </div>
  );
}