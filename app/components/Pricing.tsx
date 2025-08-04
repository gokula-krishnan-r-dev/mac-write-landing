"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { AppleIcon } from "./icons/apple";
import Link from "next/link";



export default function Pricing() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".pricing-title", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".pricing-title",
                start: "top 80%",
            },
        });

        gsap.from(".pricing-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".pricing-cards",
                start: "top 75%",
            },
        });

    }, { scope: container });

    return (
        <section
            id="pricing"
            ref={container}
            className="py-20 px-4"
        >
            <div className="relative isolate text-white px-6 py-24 sm:py-32 lg:px-8">
                {/* <div
                    className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                        }}
                    />
                </div> */}
                <div className="mx-auto max-w-4xl text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <h2 className="text-base/7 font-semibold text-indigo-600">Beta Pricing</h2>
                        <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full border border-orange-300/50 shadow-lg animate-pulse">
                            LIMITED TIME
                        </span>
                    </div>
                    <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
                        Beta Tester Special Pricing
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty  sm:text-xl/8">
                    Join our beta program with exclusive early access pricing. Help shape the future of AI writing while enjoying special beta rates.
                </p>
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                    <div className="rounded-3xl rounded-t-3xl bg-white/100 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 id="tier-hobby" className="text-base/7 font-semibold text-indigo-600">
                                Beta Basic
                            </h3>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                FREE
                            </span>
                        </div>
                        <p className="mt-4 flex items-baseline gap-x-2">
                            <span className="text-5xl font-semibold tracking-tight text-gray-900">
                                $0
                            </span>
                            <span className="text-base text-gray-500">/beta period</span>
                        </p>
                        <p className="mt-6 text-base/7 text-gray-600">
                            Get started with Macwrite AI Beta - completely free during the beta period. Perfect for trying out all features.
                        </p>
                        <ul
                            role="list"
                            className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10"
                        >
                            <li className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-indigo-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                1 Mac
                            </li>
                            <li className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-indigo-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Vision, Attachments, Presets
                            </li>
                            <li className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-indigo-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Use your tone of voice
                            </li>
                            <li className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-indigo-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                350+ models
                            </li>
                        </ul>
                        <ShimmerButton className="shadow-2xl mt-6">
                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 flex items-center gap-2 lg:text-lg">
                                <AppleIcon />
                                <span>
                                    Download for macOS
                                </span>
                            </span>
                        </ShimmerButton>
                    </div>
                    <div className="relative rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-900/10 sm:p-10">
                        <div className="flex items-center gap-2 mb-2">
                            <h3
                                id="tier-enterprise"
                                className="text-base/7 font-semibold text-indigo-400"
                            >
                                Beta Pro
                            </h3>
                            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                50% OFF
                            </span>
                        </div>
                        <p className="mt-4 flex items-baseline gap-x-2">
                            <span className="text-2xl font-semibold tracking-tight text-muted-foreground line-through">
                                $0
                            </span>
                            <span className="text-5xl font-semibold tracking-tight text-white">
                                $0
                            </span>
                            <span className="text-base text-muted-foreground">/beta price</span>
                        </p>
                        <p className="mt-6 text-base/7 text-gray-300">
                            Beta special pricing with premium features and dedicated support. Lock in this price forever as an early adopter.
                        </p>
                        <ul
                            role="list"
                            className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10"
                        >
                            <li className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-indigo-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Unlimited Macs
                            </li>
                            <li className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-indigo-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Vision, Attachments, Presets
                            </li>
                            <li className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-indigo-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Use your tone of voice
                            </li>
                            <li className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-indigo-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Premium new Models Support with free updates
                            </li>
                            <li className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-indigo-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Remote team deployment using CLI commands
                            </li>
                            <li className="flex gap-x-3">
                                <svg
                                    className="h-6 w-5 flex-none text-indigo-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Custom integrations
                            </li>
                        </ul>
                        <Link
                            href="/contact"
                            aria-describedby="tier-enterprise"
                            className="mt-8 block rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>

        </section>
    );
} 