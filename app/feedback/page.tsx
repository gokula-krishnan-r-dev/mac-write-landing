"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  rating: number;
  category: string;
  feedback: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  rating?: string;
  feedback?: string;
}

const categories = [
  "General Experience",
  "User Interface",
  "Performance",
  "Features",
  "Documentation",
  "Integration",
  "Other"
];

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    rating: 0,
    category: "",
    feedback: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please provide a rating";
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    } else if (formData.feedback.trim().length < 10) {
      newErrors.feedback = "Feedback must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", rating: 0, category: "", feedback: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrors({ feedback: "Failed to submit feedback. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
    setErrors({ ...errors, rating: undefined });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background dark:bg-[#050505] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Thank You for Your Feedback!</h1>
            <p className="text-muted-foreground">
              Your feedback helps us improve Macwrite AI Beta. We appreciate you taking the time to share your thoughts.
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={() => setSubmitted(false)}
              variant="outline"
            >
              Submit More Feedback
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
            <h1 className="text-3xl font-bold text-foreground">Share Your Feedback</h1>
            <p className="text-muted-foreground mt-1">
              Help us improve Macwrite AI Beta with your valuable feedback
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
              />
              {errors.name && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
              />
              {errors.email && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Overall Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-colors"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || formData.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm text-muted-foreground">
                {formData.rating > 0 && (
                  <>
                    {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                    {formData.rating >= 4 && " 🎉"}
                  </>
                )}
              </span>
            </div>
            {errors.rating && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="w-4 h-4" />
                {errors.rating}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-foreground">
              Feedback Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent border-border"
            >
              <option value="">Select a category (optional)</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <label htmlFor="feedback" className="text-sm font-medium text-foreground">
              Your Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              id="feedback"
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              placeholder="Tell us about your experience with Macwrite AI Beta. What do you love? What could be improved? Any suggestions?"
              rows={6}
              className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical ${
                errors.feedback ? "border-red-500" : "border-border"
              }`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formData.feedback.length} characters</span>
              {errors.feedback && (
                <span className="text-red-500">{errors.feedback}</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Your feedback helps us improve
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Share what you love about Macwrite AI Beta</li>
            <li>• Tell us about features you'd like to see</li>
            <li>• Report any usability issues or suggestions</li>
            <li>• Help us prioritize our development roadmap</li>
          </ul>
        </div>

        {/* Privacy Note */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <strong>Privacy Note:</strong> Your feedback will be used to improve our product. 
            We may contact you via the provided email for follow-up questions. 
            Your information will not be shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}