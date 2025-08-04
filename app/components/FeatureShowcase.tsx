"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Brain,
  Zap,
  Target,
  FileText,
  Clock,
  Users,
  Code,
  Mic,
  Settings,
  Shield,
  BarChart3,
  Smartphone,
  ChevronRight,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const FeatureShowcase = () => {
  const [activeTab, setActiveTab] = useState("ai-powered");

  const featureCategories = {
    "ai-powered": {
      title: "🤖 AI-Powered Text Processing",
      features: [
        {
          icon: <Brain className="w-6 h-6" />,
          title: "Multi-AI Integration",
          description: "Supports OpenAI GPT, Google Gemini, and Cloudflare Whisper for comprehensive AI assistance"
        },
        {
          icon: <FileText className="w-6 h-6" />,
          title: "Smart Text Enhancement",
          description: "Fix grammar, improve writing, translate, summarize, and make text concise instantly"
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Global Text Capture",
          description: "Capture and enhance text from any application using Option+Space hotkey"
        },
        {
          icon: <Mic className="w-6 h-6" />,
          title: "Voice-to-Text",
          description: "Advanced voice recording and transcription using Whisper AI technology"
        }
      ]
    },
    "productivity": {
      title: "📋 Advanced Task & Project Management",
      features: [
        {
          icon: <Target className="w-6 h-6" />,
          title: "Project Organization",
          description: "Create and manage multiple projects with releases, versions, and team collaboration"
        },
        {
          icon: <BarChart3 className="w-6 h-6" />,
          title: "Kanban-Style Boards",
          description: "Visual task management with drag-and-drop functionality and progress tracking"
        },
        {
          icon: <Clock className="w-6 h-6" />,
          title: "Time Tracking",
          description: "Built-in timer with pomodoro integration and productivity analytics"
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "Team Collaboration",
          description: "Assign tasks to team members, track progress, and manage dependencies"
        }
      ]
    },
    "integration": {
      title: "🔧 System Integration & Tools",
      features: [
        {
          icon: <Code className="w-6 h-6" />,
          title: "Developer Tools",
          description: "VSCode/Cursor integration, port monitoring, and development workflow automation"
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "Background Operation",
          description: "Runs quietly in background with global hotkeys and menu bar access"
        },
        {
          icon: <Settings className="w-6 h-6" />,
          title: "Customization",
          description: "Custom AI actions, workflow automation, and personalized productivity settings"
        },
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: "Cross-Platform",
          description: "Native macOS experience with planned iOS companion and cloud sync"
        }
      ]
    }
  };

  const useCases = [
    {
      title: "Content Creators & Writers",
      description: "Enhance blog posts, fix grammar, translate content, and generate summaries instantly",
      icon: <FileText className="w-8 h-8" />
    },
    {
      title: "Software Developers",
      description: "Manage development projects, track coding tasks, and monitor local servers",
      icon: <Code className="w-8 h-8" />
    },
    {
      title: "Business Professionals",
      description: "Improve emails, manage client projects, track time, and create presentations",
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Students & Researchers",
      description: "Enhance academic writing, organize research, and transcribe lectures",
      icon: <Brain className="w-8 h-8" />
    }
  ];

  const professionalFeatures = [
    "Sprint Planning & Management",
    "Resource Management & Workload Distribution",
    "Task Dependencies & Critical Path Analysis",
    "Advanced Analytics & Reporting",
    "External Integrations (GitHub, Slack, etc.)",
    "AI-Powered Smart Scheduling",
    "Enterprise Security & SSO",
    "Mobile Applications with Offline Support"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6">
            Kerlig - AI-Powered Productivity
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A sophisticated macOS productivity application that combines AI-powered text processing, 
            task management, and workspace organization into a seamless, always-available productivity companion.
          </p>
        </motion.div>

        {/* Feature Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(featureCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === key
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:scale-105"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Active Feature Category */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {featureCategories[activeTab as keyof typeof featureCategories].features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Perfect for Every Professional</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10"
              >
                <div className="text-primary mb-4 flex justify-center">{useCase.icon}</div>
                <h4 className="text-lg font-semibold mb-3">{useCase.title}</h4>
                <p className="text-muted-foreground text-sm">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-center mb-8">Professional Task Management Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {professionalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why Choose Kerlig */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8">Why Choose Kerlig?</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-xl bg-card border border-border">
              <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Privacy Focused</h4>
              <p className="text-muted-foreground text-sm">Your data stays local and secure with no tracking or analytics</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Seamless Integration</h4>
              <p className="text-muted-foreground text-sm">Works with your existing workflow without disruption</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <Target className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">AI-First Design</h4>
              <p className="text-muted-foreground text-sm">Built around modern AI capabilities, not retrofitted</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Experience Kerlig Today
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;