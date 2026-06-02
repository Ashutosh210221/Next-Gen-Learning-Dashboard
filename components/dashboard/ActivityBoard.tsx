"use client";

import { Clock, Flame, Target } from "lucide-react";

import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { StatTile } from "@/components/dashboard/StatTile";

/**
 * Client board for the Activity route. Keeping the lucide icon references
 * inside a Client Component avoids passing function props across the
 * server→client boundary.
 */
export function ActivityBoard() {
  return (
    <BentoGrid label="Activity overview">
      <StatTile icon={Flame} label="Current streak" value={12} suffix=" days" accent="amber" />
      <StatTile icon={Clock} label="Hours this week" value={18} suffix="h" accent="cyan" />
      <StatTile icon={Target} label="Weekly goals hit" value={7} suffix="/10" accent="emerald" />
      <ActivityTile className="md:col-span-2 xl:col-span-3" />
    </BentoGrid>
  );
}
