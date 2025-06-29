"use client";

import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronRight, Download, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { AppleIcon } from "./icons/apple";
import { Meteors } from "@/components/magicui/meteors";
import confetti from 'canvas-confetti';

// Add custom animation classes
const CustomStyles = () => (
    <style jsx global>{`
    @keyframes ping-slow {
      0% {
        transform: scale(1);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.5;
      }
      100% {
        transform: scale(1.2);
        opacity: 0;
      }
    }

    @keyframes fade-slide-up {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-ping-slow {
      animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    .animation-delay-500 {
      animation-delay: 500ms;
    }

    .animate-fade-slide-up {
      animation: fade-slide-up 0.5s ease-out forwards;
    }
  `}</style>
);

const avatars = [
    {
        imageUrl: "https://avatars.githubusercontent.com/u/16860528",
        profileUrl: "https://github.com/dillionverma",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/20110627",
        profileUrl: "https://github.com/tomonarifeehan",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/106103625",
        profileUrl: "https://github.com/BankkRoll",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/59228569",
        profileUrl: "https://github.com/safethecode",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/59442788",
        profileUrl: "https://github.com/sanjay-mali",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/89768406",
        profileUrl: "https://github.com/itsarghyadas",
    },
];

// Simple avatar circles component to avoid import issues
const AvatarGroup = ({ people, numExtra }: { people: typeof avatars, numExtra: number }) => {
    return (
        <div className="z-10 flex -space-x-4 rtl:space-x-reverse">
            {people.map((person, index) => (
                <a
                    key={index}
                    href={person.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                        src={person.imageUrl}
                        width={40}
                        height={40}
                        alt={`Avatar ${index + 1}`}
                    />
                </a>
            ))}
            {numExtra > 0 && (
                <a
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
                    href="#"
                >
                    +{numExtra}
                </a>
            )}
        </div>
    );
};

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed' | 'error'>('idle');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [showTip, setShowTip] = useState(false);
    const [isDirectInstallSupported, setIsDirectInstallSupported] = useState(true);
    const [installStep, setInstallStep] = useState<'initial' | 'protocol' | 'manual'>('initial');

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".hero-logo", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        })
            .from(".hero-tagline", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
            }, "-=0.4")
            .from(".hero-title", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.3")
            .from(".hero-subtitle", {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
            }, "-=0.4")
            .from(".hero-cta", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.1,
            }, "-=0.3")
            .from(".hero-image", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
            }, "-=0.4")
            .from(".hero-users", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
            }, "-=0.2");

    }, { scope: container });

    useEffect(() => {
        if (downloadState === 'completed' && buttonRef.current) {
            // Launch confetti from the button
            const rect = buttonRef.current.getBoundingClientRect();
            const x = (rect.left + rect.right) / 2 / window.innerWidth;
            const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x, y: y - 0.1 }
            });

            // Show installation tip after success
            setTimeout(() => {
                setShowTip(true);
            }, 1000);
        }
    }, [downloadState]);

    // Direct app launcher function - attempts to launch with the protocol
    const launchDirectInstall = () => {
        // Download the DMG file
        window.location.href = '/app/kerlig-1.2.0.dmg';
        setInstallStep('protocol');
    };

    // Manual download function - direct download of the app
    const downloadManually = () => {
        window.location.href = '/app/kerlig-1.2.0.dmg';
        setInstallStep('manual');
    };

    // Check if the custom URL scheme is supported
    useEffect(() => {
        // We can't reliably check if a protocol is supported, but we can check if it's macOS
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        setIsDirectInstallSupported(isMac);
    }, []);

    // Reset showTip when download state changes to idle
    useEffect(() => {
        if (downloadState === 'idle') {
            setShowTip(false);
            setInstallStep('initial');
        }
    }, [downloadState]);

    const handleDownload = async () => {
        if (downloadState === 'downloading') return;

        // Reset states if retrying after error
        setDownloadState('downloading');
        setDownloadProgress(0);
        setShowTip(false);
        setInstallStep('initial');

        try {
            // Simulate download progress with a more realistic pattern
            // Starts fast, slows in the middle, then completes quickly
            let progress = 0;
            const interval = setInterval(() => {
                if (progress < 70) {
                    // Fast initial progress
                    progress += Math.random() * 8;
                } else if (progress < 90) {
                    // Slower middle progress
                    progress += Math.random() * 3;
                } else if (progress < 99) {
                    // Final steps
                    progress += Math.random() * 1;
                } else {
                    // Complete
                    clearInterval(interval);
                    progress = 100;
                    setTimeout(() => {
                        setDownloadState('completed');

                        // Launch confetti effect
                        if (buttonRef.current) {
                            const rect = buttonRef.current.getBoundingClientRect();
                            const x = (rect.left + rect.right) / 2 / window.innerWidth;
                            const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

                            confetti({
                                particleCount: 100,
                                spread: 70,
                                origin: { x, y: y - 0.1 }
                            });
                        }

                        // Try direct installation first via custom URL protocol if on macOS
                        if (isDirectInstallSupported) {
                            launchDirectInstall();
                        } else {
                            downloadManually();
                        }

                        // Show installation tip
                        setTimeout(() => {
                            setShowTip(true);
                        }, 1000);
                    }, 500);
                }
                setDownloadProgress(progress);
            }, 200);

        } catch (error) {
            console.error("Download failed:", error);
            setDownloadState('error');
        }
    };

    const getButtonContent = () => {
        switch (downloadState) {
            case 'idle':
                return (
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 flex items-center gap-2 lg:text-md">
                        <AppleIcon />
                        <span>Download for macOS</span>
                    </span>
                );
            case 'downloading':
                return (
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 flex items-center gap-2 lg:text-md">
                        <Download className="animate-bounce" size={18} />
                        <span>Downloading... {downloadProgress.toFixed(0)}%</span>
                    </span>
                );
            case 'completed':
                return (
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 flex items-center gap-2 lg:text-md">
                        <CheckCircle className="text-green-400 animate-pulse" size={18} />
                        <span>Download Complete!</span>
                    </span>
                );
            case 'error':
                return (
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 flex items-center gap-2 lg:text-md">
                        <RefreshCw className="text-red-400 animate-spin" size={18} />
                        <span>Try Again</span>
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <section
            ref={container}
            className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden"
        >
            <CustomStyles />
            <Meteors number={30} />

            <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
                <span
                    className={cn(
                        "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
                    )}
                    style={{
                        WebkitMask:
                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "destination-out",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "subtract",
                        WebkitClipPath: "padding-box",
                    }}
                />
                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                <AnimatedGradientText className="text-sm font-medium">
                    Introducing Macwrite AI
                </AnimatedGradientText>
                <ChevronRight
                    className="ml-1 size-4 stroke-neutral-500 transition-transform
duration-300 ease-in-out group-hover:translate-x-0.5"
                />
            </div>

            <h1 className="bg-gradient-to-br text-center dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-6xl lg:text-7xl translate-y-[-1rem] animate-fade-in opacity-100 [--animation-delay:200ms]">
                Write Smarter with Macwrite AI. <br className="hidden md:block" /> Boost productivity with intelligent.
            </h1>

            <p className="mb-12 text-xs tracking-tight text-gray-400 md:text-sm text-center translate-y-[-1rem] animate-fade-in opacity-100 [--animation-delay:400ms]">
                Effortlessly write emails, respond to Slack messages, create Jira tickets, proofread content, <br className="hidden md:block" /> and chat with documents—all in one powerful AI writing assistant for macOS.
            </p>

            <div className="relative group">
                {downloadState === 'downloading' && (
                    <div className="absolute -bottom-8 left-0 w-full overflow-hidden">
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden shadow-inner">
                            <div
                                className="bg-gradient-to-r from-blue-400 via-violet-500 to-blue-400 h-2 rounded-full transition-all duration-300 ease-out bg-[length:200%_auto] animate-gradient"
                                style={{ width: `${downloadProgress}%` }}
                            />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-white/10 animate-pulse rounded-full"></div>
                    </div>
                )}

                <ShimmerButton
                    // @ts-ignore - buttonRef is used for confetti effect
                    ref={buttonRef}
                    className={cn(
                        "shadow-2xl relative overflow-hidden transition-all duration-500 group",
                        downloadState === 'downloading' && "scale-105",
                        downloadState === 'completed' && "bg-green-500/20 border-green-500/50 scale-105",
                        downloadState === 'error' && "bg-red-500/20 border-red-500/50"
                    )}
                    onClick={handleDownload}
                    disabled={downloadState === 'downloading'}
                >
                    {getButtonContent()}
                </ShimmerButton>

                {/* Animated pulse rings around button during download */}
                {downloadState === 'downloading' && (
                    <>
                        <div className="absolute inset-0 rounded-full opacity-75 animate-ping-slow bg-blue-500/20"></div>
                        <div className="absolute inset-0 rounded-full opacity-75 animate-ping-slow animation-delay-500 bg-violet-500/20"></div>
                    </>
                )}
            </div>

            {/* Installation tip that appears after successful download */}
            {showTip && (
                <div className="mt-6 bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 border border-gray-700 text-gray-300 text-sm max-w-md animate-fade-slide-up">
                    <p className="font-medium mb-2 text-center">
                        {installStep === 'protocol' ? 'Installation Started!' : 'Download Complete!'}
                    </p>

                    {installStep === 'protocol' && (
                        <>
                            <div className="mb-3 flex items-center text-xs text-gray-300">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-2">
                                    <Download size={16} className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-medium">DMG file is downloading</p>
                                    <p className="text-gray-400">Check your Downloads folder for MacwriteAI.dmg</p>
                                </div>
                            </div>

                            <ol className="list-decimal list-inside space-y-2 text-xs mb-3">
                                <li className="flex items-start">
                                    <span className="mr-2">1.</span>
                                    <span>Open the <span className="font-mono bg-gray-700/50 px-1 rounded">MacwriteAI.dmg</span> file</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">2.</span>
                                    <span>Drag MacwriteAI to the Applications folder in the window</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">3.</span>
                                    <span>Eject the disk image when finished</span>
                                </li>
                            </ol>

                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => launchDirectInstall()}
                                    className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-1.5 px-3 rounded transition-colors duration-200 flex items-center"
                                >
                                    <RefreshCw size={12} className="mr-1" /> Download Again
                                </button>
                                <button
                                    onClick={() => setDownloadState('idle')}
                                    className="text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 py-1.5 px-3 rounded transition-colors duration-200"
                                >
                                    Got It
                                </button>
                            </div>
                        </>
                    )}

                    {installStep === 'manual' && (
                        <>
                            <ol className="list-decimal list-inside space-y-2 text-xs mb-3">
                                <li className="flex items-start">
                                    <span className="mr-2">1.</span>
                                    <span>Locate the downloaded <span className="font-mono bg-gray-700/50 px-1 rounded">MacwriteAI.dmg</span> file</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">2.</span>
                                    <span>Double-click to open the disk image</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">3.</span>
                                    <span>Drag the MacwriteAI app to your Applications folder</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">4.</span>
                                    <span>Eject the disk image and launch MacwriteAI from Applications</span>
                                </li>
                            </ol>

                            <div className="flex justify-center">
                                <button
                                    onClick={() => setDownloadState('idle')}
                                    className="text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 py-1.5 px-4 rounded transition-colors duration-200"
                                >
                                    Got it!
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {downloadState === 'error' && (
                <div className="mt-4 text-sm text-red-400 animate-fade-in flex flex-col items-center">
                    <p className="mb-2">Something went wrong. Please check your internet connection.</p>
                    <button
                        onClick={() => handleDownload()}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-red-300 text-xs transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}

            <div className="py-5 flex gap-4 items-center justify-center mt-6">
                <AvatarGroup people={avatars} numExtra={99} />
                <h4 className="text-center text-sm text-gray-400">5k+ people write faster with Macwrite AI!</h4>
            </div>
        </section>
    );
}