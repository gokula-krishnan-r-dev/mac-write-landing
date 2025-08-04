"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { AppleIcon } from "./icons/apple";
import Spline from "@splinetool/react-spline";

export default function Footer() {
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
    });

    return (
        <footer className="py-16 px-12 border-t text-white border-border">
            <div className="">
                <div className="flex gap-6 items-center justify-between">

                    <div className="">

                        <div className="">
                            <Image src="/icon.png" alt="Macwrite AI" width={100} className="rounded-3xl" height={100} />
                        </div>

                        <div className="flex flex-col items-center gap-4 lg:mt-16 lg:items-start lg:gap-9">
                            <div className="flex items-center gap-3 mb-2">
                                <p className="-tracking-2 w-[101%] text-[clamp(2.625rem,_0.7086rem_+_8.1768vw,_7.25rem)] font-semibold leading-[clamp(2.938rem,_0.8144rem_+_9.0608vw,_8.063rem)] -tracking-4 whitespace-nowrap">
                                    Try Macwrite AI Beta
                                </p>
                                <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm font-semibold px-3 py-1 rounded-full border border-orange-300/50 shadow-lg animate-pulse">
                                    BETA
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm max-w-md text-center lg:text-left mb-4">
                                Join thousands of beta testers helping us shape the future of AI writing. Your feedback drives our development!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <ShimmerButton className="shadow-2xl">
                                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 flex items-center gap-2 lg:text-lg">
                                        <AppleIcon />
                                        <span>
                                            Download Beta for macOS
                                        </span>
                                    </span>
                                </ShimmerButton>
                                <a 
                                    href="/feedback" 
                                    className="px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-300/30 rounded-lg text-blue-200 font-medium text-sm hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                                >
                                    💬 Share Feedback
                                </a>
                                <a 
                                    href="/bug-report" 
                                    className="px-4 py-3 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-300/30 rounded-lg text-orange-200 font-medium text-sm hover:from-orange-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                                >
                                    🐛 Report Bug
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="h-[500px]">
                        <Spline className="rounded-3xl"
                            scene="https://prod.spline.design/TkViHlZoBD5731iJ/scene.splinecode"
                        />
                    </div>
                </div>
                <div className="rounded-3xl py-12">
                    <Spline className="rounded-3xl"
                        scene="https://prod.spline.design/duMVrLGKLLXNIqbG/scene.splinecode"
                    />
                </div>
            </div>
        </footer>
    );
}