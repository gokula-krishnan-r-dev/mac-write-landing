"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence, Variants, Easing } from "framer-motion";
import { Meteors } from "@/components/magicui/meteors";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Check, ChevronRight, Command, Clock, Sparkles } from "lucide-react";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const features = [
    {
      id: "macwrite",
      title: "MacWrite",
      description: "A floating AI assistant available system-wide on macOS. Select any text from any application and instantly generate AI-powered responses or edits.",
      icon: <Sparkles className="w-5 h-5" />,
      image: "/features/macwrite.svg",
      highlights: [
        "Works in any application",
        "Instant AI responses",
        "Seamless text insertion",
        "Context-aware suggestions"
      ]
    },
    {
      id: "taskmanager",
      title: "Task Manager",
      description: "A full end-to-end task and project management system with customizable columns like Backlog, Pending, Today, and more.",
      icon: <Clock className="w-5 h-5" />,
      image: "/features/taskmanager.svg",
      highlights: [
        "Drag & drop task organization",
        "AI-powered task assistance",
        "Real-time voice alerts",
        "Focus Mode with time tracking"
      ]
    },
    {
      id: "projectmanager",
      title: "VSCode Project Manager",
      description: "A smart macOS-native project manager for developers. Lists all available projects across the system, accessible via a simple shortcut.",
      icon: <Command className="w-5 h-5" />,
      image: "/features/projectmanager.svg",
      highlights: [
        "Command + P shortcut access",
        "AI search functionality",
        "System-wide project detection",
        "Instant project opening"
      ]
    }
  ];

  // Auto-rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [features.length]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-background to-background/95 dark:from-[#050505] dark:to-[#080808]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <Meteors number={10} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-2 rounded-full bg-secondary/30 text-sm font-medium text-secondary-foreground mb-4"
          >
            Powerful Features
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 dark:from-white dark:to-gray-400"
          >
            All-in-one productivity suite
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Boost your workflow with our integrated tools designed specifically for macOS
          </motion.p>
        </motion.div>

        {/* Feature tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: activeFeature === index ? 1 : 0.7,
                  scale: activeFeature === index ? 1 : 0.98
                }}
                onClick={() => setActiveFeature(index)}
                className={cn(
                  "p-6 rounded-xl cursor-pointer transition-all duration-300 border",
                  activeFeature === index 
                    ? "bg-secondary/30 border-secondary shadow-lg" 
                    : "bg-secondary/10 border-transparent hover:bg-secondary/20"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-2 rounded-lg",
                    activeFeature === index ? "bg-primary text-primary-foreground" : "bg-secondary/30"
                  )}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      {feature.title}
                      {activeFeature === index && (
                        <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
                      )}
                    </h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature showcase */}
          <div className="lg:col-span-8 relative h-[500px] rounded-2xl overflow-hidden border border-border bg-black/20 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full flex flex-col"
              >
                {/* Mockup window header */}
                <div className="bg-black/40 p-4 border-b border-border flex items-center">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-sm text-muted-foreground">
                    {features[activeFeature].title}
                  </div>
                </div>

                {/* Feature image */}
                <div className="flex-1 flex items-center justify-center p-6 relative">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image 
                        src={features[activeFeature].image} 
                        alt={features[activeFeature].title}
                        width={600}
                        height={350}
                        className="object-contain max-h-[350px] rounded-lg shadow-2xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature highlights */}
                <div className="bg-black/40 p-4 border-t border-border">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {features[activeFeature].highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-3 py-1 bg-secondary/20 rounded-full flex items-center gap-1 text-xs"
                      >
                        <Check className="w-3 h-3 text-primary" />
                        <span>{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;