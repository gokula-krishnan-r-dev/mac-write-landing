"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import Image from "next/image";

type TestimonialAccent = "blue" | "purple" | "green" | "amber" | "pink" | "cyan";
type TestimonialSize = "small" | "medium" | "large";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    text: string;
    size: TestimonialSize;
    accent: TestimonialAccent;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Adam",
        role: "Director of Product Design",
        company: "DesignLabs",
        avatar: "/avatars/avatar-placeholder.svg",
        text: "An essential, must-have tool. Helping with research is a big plus, it makes finding and putting together information a lot easier.",
        size: "large",
        accent: "blue"
    },
    {
        id: 2,
        name: "Angelika",
        role: "Product Designer",
        company: "Figma",
        avatar: "/avatars/avatar-placeholder.svg",
        text: "It's a beautifully designed time saver! It helps me write great copy when I design anything in Figma and communicate fast with my teammates.",
        size: "medium",
        accent: "purple"
    },
    {
        id: 3,
        name: "Mik",
        role: "Designer / Owner",
        company: "Studio Mik",
        avatar: "/avatars/avatar-placeholder.svg",
        text: "Very helpful app! Right at your fingertips, you can find everything that AI offers these days. The ability to create your own presets is a big plus.",
        size: "small",
        accent: "green"
    },
    {
        id: 4,
        name: "Mateusz",
        role: "Senior Product Designer",
        company: "Airbnb",
        avatar: "/avatars/avatar-placeholder.svg",
        text: "Great app, very easy to use, lightning fast! Keyboard interactions are very intuitive, and overall the experience is very fast and responsive.",
        size: "medium",
        accent: "amber"
    },
    {
        id: 5,
        name: "Lukas",
        role: "Business owner",
        company: "Craft Co.",
        avatar: "/avatars/avatar-placeholder.svg",
        text: "Time saver masterpiece. Now I can open Macwrite AI via a shortcut. It collects information from my clipboard and generates answers in no time.",
        size: "small",
        accent: "pink"
    },
    {
        id: 6,
        name: "Michał",
        role: "Senior Product Designer",
        company: "Apple",
        avatar: "/avatars/avatar-placeholder.svg",
        text: "I really like the native experience and how accuracy feels like an integrated part of MacOS. Macwrite AI helps me improve my text quality!",
        size: "large",
        accent: "cyan"
    },
];

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    const getAccentColor = (accent: TestimonialAccent): string => {
        switch (accent) {
            case "blue": return "from-blue-500/20 to-blue-500/5";
            case "purple": return "from-purple-500/20 to-purple-500/5";
            case "green": return "from-green-500/20 to-green-500/5";
            case "amber": return "from-amber-500/20 to-amber-500/5";
            case "pink": return "from-pink-500/20 to-pink-500/5";
            case "cyan": return "from-cyan-500/20 to-cyan-500/5";
            default: return "from-blue-500/20 to-blue-500/5";
        }
    };

    const getAccentBorder = (accent: TestimonialAccent): string => {
        switch (accent) {
            case "blue": return "border-blue-500/30";
            case "purple": return "border-purple-500/30";
            case "green": return "border-green-500/30";
            case "amber": return "border-amber-500/30";
            case "pink": return "border-pink-500/30";
            case "cyan": return "border-cyan-500/30";
            default: return "border-blue-500/30";
        }
    };

    const getCardSize = (size: TestimonialSize): string => {
        switch (size) {
            case "large": return "col-span-12 md:col-span-8 lg:col-span-8";
            case "medium": return "col-span-12 md:col-span-4 lg:col-span-4";
            case "small": return "col-span-12 md:col-span-4 lg:col-span-4";
            default: return "col-span-12 md:col-span-4 lg:col-span-4";
        }
    };

    return (
        <section
            id="testimonials"
            className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-background/90 to-background dark:from-[#050505]/90 dark:to-[#050505]"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 dark:from-white dark:to-gray-400">
                        Loved by Creative Professionals
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join <span className="font-bold text-white">5,000+</span> professionals who write faster and think clearer with Macwrite AI
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    className="grid grid-cols-12 gap-6"
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={itemVariants}
                            whileHover={{ 
                                y: -5, 
                                transition: { duration: 0.2 } 
                            }}
                            className={`${getCardSize(testimonial.size)} group`}
                        >
                            <div 
                                className={`h-full bg-gradient-to-br ${getAccentColor(testimonial.accent)} p-[1px] rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-${testimonial.accent}-500/10`}
                            >
                                <div className="h-full bg-black/40 backdrop-blur-sm rounded-2xl p-6 flex flex-col">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className={`relative h-12 w-12 rounded-full p-[2px] bg-gradient-to-br ${getAccentColor(testimonial.accent)} overflow-hidden`}>
                                            <div className="absolute inset-0 rounded-full overflow-hidden">
                                                <Image 
                                                    src={testimonial.avatar} 
                                                    alt={testimonial.name}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <span>{testimonial.role}</span>
                                                {testimonial.company && (
                                                    <>
                                                        <span className="mx-1">•</span>
                                                        <span>{testimonial.company}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <blockquote className="relative flex-1">
                                        <div className="absolute -left-1 -top-1 text-4xl opacity-20 group-hover:opacity-40 transition-opacity text-white">"</div>
                                        <p className="text-muted-foreground group-hover:text-gray-300 transition-colors relative z-10">
                                            {testimonial.text}
                                        </p>
                                        <div className="absolute -bottom-4 -right-1 text-4xl opacity-20 group-hover:opacity-40 transition-opacity text-white">"</div>
                                    </blockquote>
                                    
                                    <div className="mt-6 pt-4 border-t border-white/10">
                                        <div className="flex items-center space-x-1 text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    stroke="none"
                                                >
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
} 