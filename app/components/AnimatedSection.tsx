"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  once?: boolean;
  threshold?: number;
  animation?: "fade" | "slide" | "scale" | "none";
  staggerChildren?: number;
}

const sectionVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  slide: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  },
  none: {
    hidden: {},
    visible: {}
  }
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  id,
  once = true,
  threshold = 0.2,
  animation = "fade",
  staggerChildren = 0.1
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerChildren,
        duration: 0.5,
        ease: "easeOut",
      }
    }
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerChildren ? containerVariants : sectionVariants[animation]}
      className={className}
    >
      {staggerChildren ? (
        <motion.div variants={sectionVariants[animation]} className="w-full">
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.section>
  );
}

export function AnimatedElement({
  children,
  className = "",
  delay = 0,
  animation = "fade",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade" | "slide" | "scale" | "none";
}) {
  const variants: Variants = {
    hidden: sectionVariants[animation].hidden,
    visible: {
      ...sectionVariants[animation].visible,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
} 