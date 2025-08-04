"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { AppleIcon } from "./icons/apple";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";

export default function Footer() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        gsap.from(".footer-content", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".footer-content",
                start: "top 90%",
            },
        });

        // Animate elements on mobile differently
        if (isMobile) {
            gsap.from(".footer-logo", {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".footer-logo",
                    start: "top 95%",
                },
            });
        }
    }, [isMobile]);

    return (
        <footer className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 border-t text-white border-border">
            <div className="max-w-7xl mx-auto">
                {/* Main Content Section */}
                <div className="footer-content">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center lg:items-start">
                        
                        {/* Left Content */}
                        <div className="flex-1 w-full">
                            {/* Logo Section */}
                            <div className="footer-logo flex justify-center lg:justify-start mb-8 lg:mb-12">
                                <Image 
                                    src="/icon.png" 
                                    alt="Macwrite AI" 
                                    width={isMobile ? 80 : 100} 
                                    height={isMobile ? 80 : 100}
                                    className="rounded-2xl sm:rounded-3xl transition-all duration-300 hover:scale-105" 
                                />
                            </div>

                            {/* Main Text and CTA Section */}
                            <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-8">
                                {/* Title with Beta Badge */}
                                <div className="text-center lg:text-left">
                                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-4">
                                        <h2 className="text-[clamp(1.5rem,_4vw,_3.5rem)] sm:text-[clamp(2rem,_5vw,_4.5rem)] md:text-[clamp(2.5rem,_6vw,_5.5rem)] lg:text-[clamp(3rem,_7vw,_6rem)] font-bold leading-tight tracking-tight">
                                            Try Macwrite AI Beta
                                        </h2>
                                        <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full border border-orange-300/50 shadow-lg animate-pulse whitespace-nowrap">
                                            BETA
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                                        Join thousands of beta testers helping us shape the future of AI writing. Your feedback drives our development!
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <ShimmerButton className="shadow-2xl w-full sm:w-auto">
                                        <span className="text-center text-sm sm:text-base font-medium leading-none tracking-tight text-white flex items-center justify-center gap-2 px-2">
                                            <AppleIcon />
                                            <span className="hidden sm:inline">Download Beta for macOS</span>
                                            <span className="sm:hidden">Download for macOS</span>
                                        </span>
                                    </ShimmerButton>
                                    
                                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                        <a 
                                            href="/feedback" 
                                            className="px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-300/30 rounded-lg text-blue-200 font-medium text-sm hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 backdrop-blur-sm flex items-center justify-center whitespace-nowrap"
                                        >
                                            💬 Share Feedback
                                        </a>
                                        <a 
                                            href="/bug-report" 
                                            className="px-4 py-3 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-300/30 rounded-lg text-orange-200 font-medium text-sm hover:from-orange-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-sm flex items-center justify-center whitespace-nowrap"
                                        >
                                            🐛 Report Bug
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Spline Section */}
                        <div className="w-full lg:w-auto lg:flex-shrink-0">
                            <div className="h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full lg:w-[400px] xl:w-[500px]">
                                <Spline 
                                    className="rounded-2xl sm:rounded-3xl w-full h-full"
                                    scene="https://prod.spline.design/TkViHlZoBD5731iJ/scene.splinecode"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Spline Section */}
                <div className="mt-12 lg:mt-16">
                    <div className="rounded-2xl sm:rounded-3xl overflow-hidden">
                        <div className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                            <Spline 
                                className="w-full h-full"
                                scene="https://prod.spline.design/duMVrLGKLLXNIqbG/scene.splinecode"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}