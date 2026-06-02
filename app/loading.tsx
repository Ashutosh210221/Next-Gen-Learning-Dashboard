import { DashboardSkeleton } from "@/components/dashboard/skeletons";

/**
 * Route-level loading UI (Next.js streaming). Renders the full dashboard
 * silhouette with pulsing skeletons during navigations to this segment.
 */
export default function Loading() {
  return <DashboardSkeleton />;
}
