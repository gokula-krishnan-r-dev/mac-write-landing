"use client";

import { useEffect, useState } from "react";
import { Meteors } from "@/components/magicui/meteors";
import { ChevronLeft, Calendar, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Release {
    version: string;
    date: string;
    daysAgo: string;
    title: string;
    description?: string;
    newFeatures?: string[];
    fixes?: string[];
    notes?: string;
    sections?: {
        title: string;
        content?: string;
        features?: string[];
    }[];
}

interface ReleasesData {
    releases: Release[];
}

export default function ReleasesPage() {
    const [releases, setReleases] = useState<Release[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReleases = async () => {
            try {
                const response = await fetch('/releases.json');
                const data: ReleasesData = await response.json();
                setReleases(data.releases);
            } catch (error) {
                console.error('Error fetching releases:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, []);

    const formatText = (text: string) => {
        // Convert markdown-style bold text to JSX
        return text
            .split(/(\*\*[^*]+\*\*)/)
            .map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <strong key={index} className="font-semibold text-white">
                            {part.slice(2, -2)}
                        </strong>
                    );
                }
                // Convert backtick code to JSX
                return part
                    .split(/(`[^`]+`)/)
                    .map((subPart, subIndex) => {
                        if (subPart.startsWith('`') && subPart.endsWith('`')) {
                            return (
                                <code key={`${index}-${subIndex}`} className="bg-gray-800 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono">
                                    {subPart.slice(1, -1)}
                                </code>
                            );
                        }
                        return subPart;
                    });
            })
            .flat();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-lg">Loading releases...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <Meteors number={20} />

            {/* Header */}
            <div className="relative z-10 pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Home page
                    </Link>

                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                                Releases
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Latest updates and improvements to Macwrite AI
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/docs"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Help
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Buy $47 <span className="line-through text-gray-500">$60</span>
                            </Link>
                            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Releases List */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
                <div className="space-y-12">
                    {releases.map((release, index) => (
                        <div
                            key={release.version}
                            className={cn(
                                "relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 hover:bg-gray-900/70",
                                index === 0 && "border-blue-500/50 shadow-2xl shadow-blue-500/10"
                            )}
                        >
                            {index === 0 && (
                                <div className="absolute -top-3 left-6">
                                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        Latest
                                    </span>
                                </div>
                            )}

                            {/* Release Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold text-white">
                                            Version {release.version}
                                        </h2>
                                        <span className="text-gray-400 text-sm">
                                            • {release.daysAgo}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <time>{release.date}</time>
                                    </div>
                                </div>
                            </div>

                            {/* Release Title */}
                            <h3 className="text-xl font-semibold text-white mb-4">
                                {release.title}
                            </h3>

                            {/* Description */}
                            {release.description && (
                                <p className="text-gray-300 mb-6">{release.description}</p>
                            )}

                            {/* New Features */}
                            {release.newFeatures && release.newFeatures.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                        ✨ New in this release:
                                    </h4>
                                    <ul className="space-y-3">
                                        {release.newFeatures.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start gap-3">
                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-gray-300 leading-relaxed">
                                                    {formatText(feature)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Fixes */}
                            {release.fixes && release.fixes.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                        🔧 Fixes:
                                    </h4>
                                    <ul className="space-y-3">
                                        {release.fixes.map((fix, fixIndex) => (
                                            <li key={fixIndex} className="flex items-start gap-3">
                                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-gray-300 leading-relaxed">
                                                    {formatText(fix)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Sections (for complex releases like 2.0.0) */}
                            {release.sections && release.sections.length > 0 && (
                                <div className="space-y-6 mb-6">
                                    {release.sections.map((section, sectionIndex) => (
                                        <div key={sectionIndex}>
                                            <h4 className="text-lg font-semibold text-white mb-3">
                                                {section.title}
                                            </h4>
                                            {section.content && (
                                                <p className="text-gray-300 leading-relaxed mb-4">
                                                    {formatText(section.content)}
                                                </p>
                                            )}
                                            {section.features && section.features.length > 0 && (
                                                <ul className="space-y-2">
                                                    {section.features.map((feature, featureIndex) => (
                                                        <li key={featureIndex} className="flex items-start gap-3">
                                                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                                            <span className="text-gray-300 leading-relaxed">
                                                                {formatText(feature)}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Notes */}
                            {release.notes && (
                                <div className="pt-4 border-t border-gray-800">
                                    <p className="text-gray-400 italic">{release.notes}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 