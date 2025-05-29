"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const testimonials = [
    {
        id: 1,
        name: "Adam",
        role: "Director of Product Design",
        text: "An essential, must-have tool. Helping with research is a big plus, it makes finding and putting together information a lot easier. If you need to communicate in different languages, it's great for that too. Macwrite AI also helps catch grammar and spelling mistakes. When you're stuck on what to write about, it throws in some good content ideas. Plus, it's really quick.",
    },
    {
        id: 2,
        name: "Angelika",
        role: "Product Designer",
        text: "It's a beautifully designed time saver! It helps me write great copy when I design anything in Figma and communicate fast with my teammates on Slack.",
    },
    {
        id: 3,
        name: "Mik",
        role: "Designer / Owner",
        text: "Very helpful app! It's very handy. Right at your fingertips, you can find everything that AI offers these days. The ability to create your own presets is a big plus. I don't have to go to the specific webpage to talk to my AI assistant. I have it under one shortcut on my Mac.",
    },
    {
        id: 4,
        name: "Mateusz",
        role: "Senior Product Designer",
        text: "Great app, very easy to use, lightning fast! I love how easy it is to use. Keyboard interactions are very intuitive, and overall the experience is very fast and responsive. I love that! Macwrite AI helps me fix my grammar mistakes and improve my writing when communicating with clients and colleagues on Slack & Email.",
    },
    {
        id: 5,
        name: "Lukas",
        role: "Business owner",
        text: "Time saver masterpiece. Before I used Macwrite AI, I had to switch to my browser, open ChatGPT, paste my question, and then wait for the response. Now I can open Macwrite AI via a shortcut. It collects information from my clipboard. I can directly ask questions, and the answers are generated in no time.",
    },
    {
        id: 6,
        name: "Michał",
        role: "Senior Product Designer",
        text: "Purchased through pre-order. It turned out to be an excellent deal! I really like the native experience and how accuracy feels like an integrated part of MacOS. Macwrite AI really helps me improve my text quality and brainstorm in no time!",
    },
];

export default function Testimonials() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".testimonial-title", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".testimonial-title",
                start: "top 80%",
            },
        });

        gsap.from(".testimonial-card", {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".testimonial-grid",
                start: "top 75%",
            },
        });
    }, { scope: container });

    return (
        <section
            id="testimonials"
            ref={container}
            className="py-20 px-4 text-white"
        >
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="testimonial-title text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Loved by Thousands
                    </h2>
                    <p className="testimonial-title text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join <strong>5,000+</strong> professionals who write faster with Macwrite AI
                    </p>
                </div>

                <div className="testimonial-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="testimonial-card bg-card border border-border rounded-xl p-6 flex flex-col"
                        >
                            <div className="mb-4">
                                <div className="flex items-center space-x-1 text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            <blockquote className="flex-1">
                                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                            </blockquote>

                            <div className="mt-auto pt-4 border-t border-border">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
} 