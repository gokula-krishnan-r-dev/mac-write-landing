"use client";

import { Meteors } from "@/components/magicui/meteors";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <Meteors number={20} />

            <div className="relative z-10 pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Home page
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-8">
                        Documentation
                    </h1>

                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <p className="text-gray-300 text-lg">
                            Documentation coming soon! Stay tuned for comprehensive guides and tutorials.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 