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
                            <Image src="/icon.png" alt="Macwrite AI" width={200} height={200} />
                        </div>

                        <div className="flex flex-col items-center gap-4 lg:mt-16 lg:items-start lg:gap-9">
                            <p className="-tracking-2 w-[101%] text-[clamp(2.625rem,_0.7086rem_+_8.1768vw,_7.25rem)] font-semibold leading-[clamp(2.938rem,_0.8144rem_+_9.0608vw,_8.063rem)] -tracking-4 whitespace-nowrap">
                                Try Macwrite AI Now
                            </p>
                            <div className="">
                                <ShimmerButton className="shadow-2xl">
                                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 flex items-center gap-2 lg:text-lg">
                                        <AppleIcon />
                                        <span>
                                            Download for macOS
                                        </span>
                                    </span>
                                </ShimmerButton>
                            </div>
                        </div>

                    </div>
                    <div className="">
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