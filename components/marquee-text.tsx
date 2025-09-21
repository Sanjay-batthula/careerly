"use client"

import { motion } from "framer-motion"

interface MarqueeTextProps {
  text: string
  className?: string
  speed?: number
}

export function MarqueeText({ text, className = "", speed = 50 }: MarqueeTextProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block bg-gradient-to-r from-[#1e4c93] to-[#20bbcf] bg-clip-text text-transparent"
        animate={{
          x: ["100%", "-100%"],
        }}
        transition={{
          duration: speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {text}
      </motion.div>
    </div>
  )
}
