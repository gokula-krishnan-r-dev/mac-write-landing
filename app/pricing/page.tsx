"use client";

import { Meteors } from "@/components/magicui/meteors";
import { ChevronLeft, Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
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
                        Pricing
                    </h1>

                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <span className="text-5xl font-bold text-white">$47</span>
                                <span className="text-2xl text-gray-400 line-through">$60</span>
                            </div>
                            <p className="text-gray-300 text-lg">One-time purchase • Lifetime access</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            {[
                                "Unlimited AI conversations",
                                "Multiple AI models support",
                                "Custom actions and shortcuts",
                                "Document chat functionality",
                                "Email and message writing",
                                "Lifetime updates",
                                "Priority support"
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <span className="text-gray-300">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105">
                            Buy Macwrite AI - $47
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 