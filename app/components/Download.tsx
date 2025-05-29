"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

export default function Download() {
    const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    useGSAP(() => {
        gsap.from(".download-content", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#download",
                start: "top 80%",
            },
        });
    });

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleDownload = (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setEmailError("");

        // Validate email
        if (!email) {
            setEmailError("Email is required");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        // Start download process
        setDownloadState('loading');

        // Simulate download process
        setTimeout(() => {
            // In a real app, you would trigger the download here

            // Simulate successful download
            setDownloadState('success');

            // Reset after some time
            setTimeout(() => {
                setDownloadState('idle');
                setEmail("");
            }, 3000);
        }, 2000);
    };

    return (
        <section id="download" className="py-20 px-4">
            <div className="container max-w-3xl mx-auto">
                <div className="download-content bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                        Try Macwrite AI for free
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                        Download a 14-day fully-featured trial. No credit card required.
                    </p>

                    <form onSubmit={handleDownload} className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className={`w-full px-4 py-3 rounded-full border ${emailError ? "border-destructive" : "border-border"
                                            } bg-background focus:outline-none focus:ring-2 focus:ring-accent/50`}
                                        disabled={downloadState === 'loading'}
                                    />
                                    {emailError && (
                                        <p className="text-destructive text-sm mt-1 text-left absolute">
                                            {emailError}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={downloadState !== 'idle' && downloadState !== 'error'}
                                className={`px-6 py-3 rounded-full font-medium transition-all ${downloadState === 'loading'
                                    ? "bg-accent/70 text-accent-foreground cursor-wait"
                                    : downloadState === 'success'
                                        ? "bg-green-600 text-white"
                                        : "bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/20"
                                    }`}
                            >
                                {downloadState === 'loading' ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Downloading...
                                    </span>
                                ) : downloadState === 'success' ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Downloaded!
                                    </span>
                                ) : (
                                    "Download for Mac"
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="text-muted-foreground text-sm mt-6">
                        Compatible with macOS 10.15 (Catalina) and above
                    </p>

                    <div className="mt-12 pt-6 border-t border-border">
                        <div className="flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 text-accent"
                            >
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <span className="text-sm font-medium">
                                Secure download from our servers
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 