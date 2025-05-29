"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Settings } from "lucide-react";

interface SpecItemProps {
    title: string;
    items: string[];
}

const SpecItem = ({ title, items }: SpecItemProps) => (
    <div className="mb-8">
        <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-4">{title}</h3>
        <p className="text-sm font-medium uppercase tracking-wide">
            {items.map((item, i) => (
                <span key={i}>
                    {item}
                    {i < items.length - 1 && <span className="mx-2 text-muted-foreground">/</span>}
                </span>
            ))}
        </p>
    </div>
);

export default function TechSpecs() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".tech-title", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        })
            .from(".tech-subtitle", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
            }, "-=0.4")
            .from(".tech-image", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
            }, "-=0.2")
            .from(".spec-item", {
                y: 20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
            }, "-=0.3")
            .from(".dive-deeper", {
                y: 10,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out",
            }, "-=0.1");
    }, { scope: container });

    return (
        <section
            ref={container}
            className="py-32 bg-background dark:bg-[#050505] text-white overflow-hidden relative"
        >
            <div className="px-9 relative z-10">
                <div className="">
                    <h2 className="tech-title text-4xl md:text-5xl font-medium mb-4 text-white">
                        Tech Specs
                    </h2>
                    <h3 className="tech-subtitle text-3xl md:text-4xl font-medium text-gray-100 mb-16">
                        Engineered to run faster-than-light.
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
                        <div className="md:col-span-1 tech-image">
                            <div className="relative w-full aspect-square max-w-[400px] mx-auto rounded-md overflow-hidden bg-gradient-to-br from-purple-600/30 via-blue-500/30 to-purple-400/30">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Settings color="white" size={64} />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                            <div className="spec-item">
                                <SpecItem
                                    title="Technology"
                                    items={["Swift", "Go Land API", "Rust"]}
                                />
                            </div>

                            <div className="spec-item">
                                <SpecItem
                                    title="Compatibility"
                                    items={["Mac"]}
                                />
                            </div>

                            <div className="spec-item">
                                <SpecItem
                                    title="Appearance"
                                    items={["Customizable"]}
                                />
                            </div>

                            <div className="spec-item">
                                <SpecItem
                                    title="Rendering Engines"
                                    items={["Swift Engine"]}
                                />
                            </div>

                            <div className="spec-item">
                                <SpecItem
                                    title="AI Support"
                                    items={["Gemini", "GPT-4", "Claude", "Groq"]}
                                />
                            </div>

                            <div className="spec-item">
                                <SpecItem
                                    title="Prompt Support"
                                    items={["PSI", "Starship", "Spaceship", "P10K", "OH-MY-POSH", "OH-MY-ZSH"]}
                                />
                            </div>

                            <div className="spec-item md:col-span-3">
                                <SpecItem
                                    title="Configurable"
                                    items={["Input Position", "Opacity", "Themes", "Background Images", "Shell"]}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}