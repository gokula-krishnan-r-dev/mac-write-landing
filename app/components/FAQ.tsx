"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

const faqs = [
    {
        question: "How does it work?",
        answer:
            "Macwrite AI is a Mac application that uses AI to help you with writing tasks. It integrates with any app on your Mac and is accessible via a keyboard shortcut. You can use it to proofread text, generate responses, summarize documents, and more.",
    },
    {
        question: "What about the cost of tokens?",
        answer:
            "You'll need to provide your own API keys for the AI models you want to use (OpenAI, Anthropic, etc.). You pay only for the tokens you use directly to those providers. There's no markup or hidden fees from us.",
    },
    {
        question: "What models are supported?",
        answer:
            "Macwrite AI supports over 350 models from OpenAI, Anthropic, Google, Groq, and OpenRouter. You can also use local models with Ollama integration.",
    },
    {
        question: "What is the context window limit?",
        answer:
            "The context window limit depends on the model you use. For instance, GPT-4 has a 128k token limit, Claude 3 Opus has a 200k token limit, and so on. Macwrite AI doesn't impose any additional limitations beyond what the models themselves support.",
    },
    {
        question: "How does the license work?",
        answer:
            "You pay once for the license which includes one year of app updates. Each license is tied to a specific number of seats (Macs). The Basic license is for 1 Mac, Pro for 2 Macs, and Team for 10 Macs.",
    },
    {
        question: "What's the refund policy?",
        answer:
            "We offer a 14-day money-back guarantee. If you're not satisfied with Macwrite AI, contact our support team within 14 days of purchase for a full refund.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useGSAP(() => {
        gsap.from(".faq-title", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".faq-title",
                start: "top 80%",
            },
        });

        gsap.from(".faq-item", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".faq-list",
                start: "top 80%",
            },
        });
    });

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 text-white px-4">
            <div className="container max-w-4xl mx-auto">
                <h2 className="faq-title text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
                    FAQ
                </h2>

                <div className="faq-list space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="faq-item border border-border rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <span className="font-medium text-lg">{faq.question}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`transition-transform ${openIndex === index ? "transform rotate-180" : ""
                                            }`}
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                                    }`}
                            >
                                <div className="p-6 pt-0 text-muted-foreground">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 