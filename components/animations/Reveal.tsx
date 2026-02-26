import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = "100%", delay = 0, className = "" }) => (
  <motion.div
    style={{ position: "relative", width }}
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-75px" }}
    transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay }}
  >
    {children}
  </motion.div>
);
