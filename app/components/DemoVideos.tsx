"use client";

import { motion, Variants } from "framer-motion";
import { Play, ArrowRight, Sparkles, Target } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Demo {
  id: string;
  video: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  gradient: string;
}

const demos: Demo[] = [
  {
    id: "email-demo",
    video: "/app/email.mov",
    title: "AI-Powered Email Composition",
    subtitle: "From concept to send in under 30 seconds",
    description:
      "Transform your email workflow with intelligent composition. MacWrite understands context, tone, and purpose to craft professional emails that get results.",
    features: [
      "Smart tone adjustment (formal, casual, persuasive)",
      "Auto-formatting with bullet points and structure",
      "Context-aware suggestions and completions",
      "Multi-language support with cultural nuances",
      "Template library for common scenarios"
    ],
    icon: Sparkles,
    gradient: "from-blue-500/20 to-purple-600/20"
  },
  {
    id: "todo-demo",
    video: "/app/todo.mov",
    title: "Intelligent Task Management",
    subtitle: "Stay organized without the mental overhead",
    description:
      "Experience task management that adapts to your workflow. MacWrite's Todo system learns your patterns and helps you maintain focus on what truly matters.",
    features: [
      "Natural language task creation and editing",
      "Smart priority suggestions based on deadlines",
      "Automatic categorization and tagging",
      "Time-based reminders and scheduling",
      "Progress tracking with visual insights"
    ],
    icon: Target,
    gradient: "from-green-500/20 to-emerald-600/20"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const DemoHeader = ({ demo, index }: { demo: Demo; index: number }) => {
  const Icon = demo.icon;
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={``}
    >
      
      <motion.h2 
        variants={itemVariants}
        className="text-4xl md:text-3xl font-bold tracking-tight mb-4 text-white drop-shadow-lg"
      >
        {demo.title}
      </motion.h2>

    </motion.div>
  );
};

const VideoPlayer = ({ demo }: { demo: Demo }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
    viewport={{ once: true, amount: 0.3 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
    <video
      src={demo.video}
      autoPlay
      playsInline
      muted
      loop
      className="relative w-full h-auto max-w-6xl rounded-2xl shadow-2xl object-contain bg-black border border-white/10"
    />
  </motion.div>
);

export default function DemoVideos() {
  return (
    <section className="w-full">
      {demos.map((demo, index) => (
        <AnimatedSection
          key={demo.id}
          id={demo.id}
          animation="fade"
          className="flex flex-col items-center justify-center w-full min-h-screen px-4 md:px-8 py-20 relative overflow-hidden"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <DemoHeader demo={demo} index={index} />
            <VideoPlayer demo={demo} />
          </div>

          
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-lg"
          />
        </AnimatedSection>
      ))}
    </section>
  );
}