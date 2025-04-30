"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { RiMoonFill } from "react-icons/ri";

export function Button({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        bg-[#38d4e7]
        hover:bg-[#32bfd0]
        text-white
        text-base
        py-4.5
        px-8
        rounded-[14px]
        transition-colors
        font-medium
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function ButtonDeep() {
  const scale = 0.7;

  const [active, setActive] = useState(false);
  const [holding, setHolding] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const controls = useAnimation();

  // Base sizes
  const BASE_CONTAINER = 56;
  const BASE_WRAPPER = 48;
  const BASE_ICON = 34;
  const STROKE = 2;

  // Scaled
  const containerSize = BASE_CONTAINER * scale;
  const wrapperSize = BASE_WRAPPER * scale;
  const iconSize = BASE_ICON * scale;
  const R = wrapperSize / 2;
  const C = 2 * Math.PI * R;
  const center = containerSize / 2;

  // Long press handlers
  function handlePointerDown() {
    if (active) return;
    setHolding(true);
    timeoutRef.current = window.setTimeout(() => {
      setActive(true);
      setHolding(false);
    }, 2000);
  }
  function handlePointerUp() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    setHolding(false);
  }

  // One-time scale pulse on activation
  useEffect(() => {
    if (active) {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.6, ease: "easeOut" },
      });
    }
  }, [active, controls]);

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer"
      style={{ width: containerSize, height: containerSize }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Static border */}
      <svg
        width={containerSize}
        height={containerSize}
        className="absolute top-0 left-0"
      >
        <circle
          cx={center}
          cy={center}
          r={R}
          stroke="#39d4e7"
          strokeWidth={STROKE}
          fill="transparent"
          opacity={0.3}
        />
        {/* Progress arc on long press */}
        {holding && (
          <motion.circle
            cx={center}
            cy={center}
            r={R}
            stroke="#39d4e7"
            strokeWidth={STROKE}
            fill="transparent"
            strokeDasharray={C}
            strokeDashoffset={C}
            transform={`rotate(-90 ${center} ${center})`}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "linear" }}
          />
        )}
      </svg>

      {/* Icon wrapper with completion pulse */}
      <motion.div
        className={`rounded-full flex items-center justify-center transition-colors duration-200
          ${
            active
              ? "bg-gradient-to-tr from-[#39d4e7] to-[#39d4e7] shadow-[0_0_10px_0_rgba(0,255,255,0.7)]"
              : "bg-transparent"
          }`}
        style={{ width: wrapperSize, height: wrapperSize }}
        animate={controls}
      >
        <RiMoonFill size={iconSize} color={active ? "#fff" : "#39d4e7"} />
      </motion.div>
    </div>
  );
}

export function ButtonComponent() {
  return (
    <div className="flex flex-col gap-4">
      <Button>Button</Button>
      <ButtonDeep />
    </div>
  );
}
