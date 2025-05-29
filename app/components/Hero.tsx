"use client";

import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { AppleIcon } from "./icons/apple";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { Meteors } from "@/components/magicui/meteors";

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
export default function Hero() {
    const container = useRef<HTMLDivElement>(null);

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

    return (
        <section
            ref={container}
            className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden "
        >
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

            <p className="mb-12 text-xs tracking-tight text-gray-400 md:text-sm  text-center translate-y-[-1rem] animate-fade-in opacity-100 [--animation-delay:400ms]">Effortlessly write emails, respond to Slack messages, create Jira tickets, proofread content,  <br className="hidden md:block" /> and chat with documents—all in one powerful AI writing assistant for macOS.</p>
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

            <div className="py-5 flex gap-4 items-center justify-center">
                <AvatarCircles numPeople={99} avatarUrls={avatars} />;
                <h4 className="text-center text-sm text-gray-400">5k+ people write faster with Macwrite AI!</h4>
            </div>
        </section>
    );
}