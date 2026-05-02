"use client";

import { motion } from "framer-motion";

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  zones: { color: string; label: string; min: number; max: number }[];
}

export function Gauge({ value, min, max, zones }: GaugeProps) {
  // Clamp value between min and max
  const clampedValue = Math.max(min, Math.min(max, value));
  // Calculate percentage (0 to 100)
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  return (
    <div className="w-full my-6">
      <div className="relative h-6 rounded-full overflow-hidden flex shadow-inner bg-gray-200 dark:bg-gray-800">
        {zones.map((zone, i) => {
          const zoneWidth = ((zone.max - zone.min) / (max - min)) * 100;
          return (
            <div
              key={i}
              style={{ width: `${zoneWidth}%`, backgroundColor: zone.color }}
              className="h-full border-r border-black/10 dark:border-white/10 last:border-0 opacity-80"
              title={zone.label}
            />
          );
        })}
        {/* Animated Marker */}
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="absolute top-0 bottom-0 w-1.5 bg-black dark:bg-white rounded-full -ml-0.5 shadow-md z-10"
        />
      </div>
      
      {/* Labels */}
      <div className="flex justify-between text-xs mt-2 text-gray-500 dark:text-gray-400 font-bold px-1">
        {zones.map((zone, i) => (
          <div key={i} className="text-center" style={{ width: `${((zone.max - zone.min) / (max - min)) * 100}%` }}>
            {zone.label}
          </div>
        ))}
      </div>
    </div>
  );
}
