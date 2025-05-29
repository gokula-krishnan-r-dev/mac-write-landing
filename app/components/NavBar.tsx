"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { AppleIcon } from "./icons/apple";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        gsap.from(".nav-item", {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
        });
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);

        if (!isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "py-3 bg-background/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-border shadow-sm"
                : "py-5"
                }`}
        >
            <div className="flex  items-center justify-between px-6 py-1">
                <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
                    <div className="flex items-center z-50">
                        <Image
                            src="/icon.png"
                            alt="Kerlig AI Logo"
                            width={120} // Adjust width as needed
                            height={62}
                        />
                    </div>
                </div>


                <nav className="hidden md:flex text-black dark:text-white items-center space-x-6">
                    <Link href="/docs">Docs</Link>
                    <Link href="/pricing">Pricing</Link>
                    <div className="flex items-center space-x-2">
                        <Link href="/download" className="flex border text-sm font-medium rounded-full items-center px-4 py-2 space-x-2">
                            <AppleIcon />
                            <span>Download</span>
                        </Link>
                    </div>
                </nav>

                <div className="flex items-center md:hidden space-x-4 z-50">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full bg-secondary/80 hover:bg-secondary/100 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="5" />
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                            </svg>
                        )}
                    </button>

                    <button
                        onClick={toggleMenu}
                        className="p-2 bg-secondary/80 hover:bg-secondary/100 rounded-full"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="4" x2="20" y1="12" y2="12" />
                                <line x1="4" x2="20" y1="6" y2="6" />
                                <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                <div
                    className={`fixed inset-0 bg-background/95 dark:bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <nav className="flex flex-col items-center space-y-6 text-xl">
                        <a
                            href="#"
                            onClick={toggleMenu}
                            className="font-medium hover:text-accent transition-colors"
                        >
                            Help
                        </a>
                        <a
                            href="#"
                            onClick={toggleMenu}
                            className="font-medium hover:text-accent transition-colors"
                        >
                            Releases
                        </a>
                        <a
                            href="#pricing"
                            onClick={toggleMenu}
                            className="font-medium hover:text-accent transition-colors"
                        >
                            Buy $47 <span className="text-sm line-through opacity-70">$60</span>
                        </a>
                        <a
                            href="#download"
                            onClick={toggleMenu}
                            className="gradient-btn rounded-full px-8 py-3 text-accent-foreground font-medium hover:shadow-lg hover:shadow-accent/20 transition-all flex items-center"
                        >
                            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.9999 2C13.8769 2 15.7539 2.001 17.6299 2C18.3149 2.001 18.9499 2.176 19.5339 2.525C20.4249 3.066 21.0149 3.855 21.2979 4.822C21.4259 5.254 21.4899 5.695 21.4899 6.148C21.4909 9.25 21.4909 12.35 21.4899 15.452C21.4899 16.489 21.1499 17.407 20.4699 18.165C19.9869 18.697 19.3909 19.062 18.6969 19.261C18.3489 19.361 17.9899 19.41 17.6299 19.41C13.8769 19.411 10.1229 19.41 6.37094 19.41C5.33394 19.41 4.41694 19.071 3.65794 18.387C3.10594 17.886 2.73694 17.282 2.53794 16.575C2.42694 16.194 2.37894 15.804 2.37894 15.405C2.37794 12.318 2.37794 9.232 2.37894 6.145C2.37994 4.891 2.90094 3.879 3.90194 3.123C4.46494 2.699 5.11594 2.459 5.82894 2.367C6.00994 2.344 6.19394 2.33 6.37694 2.329C8.25094 2.328 10.1249 2.329 11.9989 2.329M7.01294 7.143C7.01294 9.841 7.01294 12.539 7.01194 15.237C7.01194 15.343 7.03394 15.381 7.14894 15.359C7.33494 15.324 7.52194 15.29 7.70894 15.256C9.24994 14.905 10.7919 14.553 12.3329 14.201C12.5869 14.145 12.8409 14.089 13.0959 14.038C13.2959 14 13.4419 13.882 13.5369 13.705C13.6959 13.417 13.8559 13.129 14.0149 12.842C14.2819 12.384 14.5469 11.927 14.8149 11.469C15.1999 10.835 15.5859 10.201 15.9719 9.568C16.3189 8.997 16.6659 8.427 17.0119 7.856C17.0409 7.812 17.0679 7.766 17.0959 7.723C17.1669 7.613 17.1429 7.546 17.0189 7.481C16.7119 7.324 16.4049 7.167 16.0979 7.01C15.1969 6.539 14.2969 6.069 13.3959 5.6C12.7129 5.251 12.0299 4.902 11.3479 4.553C11.2969 4.528 11.2489 4.536 11.1989 4.555C10.7349 4.751 10.2719 4.95 9.80694 5.147C9.21094 5.393 8.61394 5.638 8.01794 5.885C7.66794 6.033 7.31894 6.183 6.96994 6.332C6.97594 6.602 6.97994 6.873 6.97994 7.143H7.01194H7.01294Z"></path>
                            </svg>
                            Download
                        </a>
                    </nav>
                </div>
            </div>
        </header >
    );
} 