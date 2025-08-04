"use client";

import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function ProductExplanation() {
  return (
    <AnimatedSection
      id="product-explanation"
      animation="fade"
      className="flex flex-col items-center justify-center w-full min-h-screen px-4 md:px-8 py-20 relative overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Info className="w-6 h-6 text-blue-500" />
            <span className="text-blue-500 font-medium text-sm uppercase tracking-wider">
              Product Overview
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
            See Macwrite in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Watch this comprehensive walkthrough to discover how Macwrite transforms your writing workflow with AI-powered assistance.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative group"
        >
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
          
          {/* YouTube video embed */}
          <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <div className="relative w-full" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
              <iframe
                src="https://www.youtube.com/embed/QYrLvOprxOQ?rel=0&modestbranding=1&showinfo=0"
                title="Macwrite Product Explanation"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          
          {/* Play button overlay for styling (optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </motion.div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            Ready to experience the future of writing assistance?
          </p>
          <motion.a
            href="#download"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Download Macwrite
            <Play className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
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
        className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-lg"
      />
      
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-32 right-20 w-8 h-8 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full blur-lg"
      />
    </AnimatedSection>
  );
}