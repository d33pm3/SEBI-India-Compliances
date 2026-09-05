import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = { [k: string]: { label?: React.ReactNode; icon?: React.ComponentType; color?: string; theme?: Record<string, string> } };
const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);
export function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within a <ChartContainer />");
  return ctx;
}
export const ChartContainer = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { config: ChartConfig; children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"] }>(({ className, children, config, ...props }, ref) => (
  <ChartContext.Provider value={{ config }}>
    <div ref={ref} className={cn("flex aspect-video justify-center text-xs", className)} {...props}>
      <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
    </div>
  </ChartContext.Provider>
));
ChartContainer.displayName = "Chart";
export const ChartTooltip = RechartsPrimitive.Tooltip;
export function ChartTooltipContent({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color?: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return <div className="rounded-md border bg-background px-2 py-1 text-xs shadow">{label && <p className="font-medium">{label}</p>}{payload.map(p => <p key={p.name}>{p.name}: {p.value}</p>)}</div>;
}
export const ChartLegend = RechartsPrimitive.Legend;
export function ChartLegendContent() { return null; }
export const ChartStyle = () => null;
