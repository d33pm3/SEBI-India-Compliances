import * as React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SidebarContextValue = { open: boolean; setOpen: (open: boolean) => void; toggle: () => void };
const SidebarContext = React.createContext<SidebarContextValue | null>(null);
export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
export function SidebarProvider({ children, defaultOpen = true }: { children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const value = React.useMemo(() => ({ open, setOpen, toggle: () => setOpen(v => !v) }), [open]);
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
export function Sidebar({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { open } = useSidebar();
  return <aside data-state={open ? "open" : "closed"} className={cn("flex h-full flex-col border-r bg-sidebar text-sidebar-foreground", open ? "w-64" : "w-14", className)} {...props}>{children}</aside>;
}
export const SidebarHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("p-3", className)} {...props} />;
export const SidebarFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("mt-auto p-3", className)} {...props} />;
export const SidebarContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("flex-1 overflow-auto p-2", className)} {...props} />;
export const SidebarGroup = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("px-2 py-1", className)} {...props} />;
export const SidebarGroupLabel = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground", className)} {...props} />;
export const SidebarGroupContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("space-y-0.5", className)} {...props} />;
export const SidebarGroupAction = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button className={cn("ml-auto", className)} {...props} />;
export const SidebarSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("mx-2 my-2 h-px bg-border", className)} {...props} />;
export const SidebarRail = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("hidden", className)} {...props} />;
export const SidebarInset = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("flex-1", className)} {...props} />;
export const SidebarInput = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => <input className={cn("h-8 w-full rounded-md border bg-background px-2 text-xs", className)} {...props} />;
export function SidebarTrigger({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { toggle } = useSidebar();
  return <Button variant="ghost" size="icon" className={cn("h-8 w-8", className)} onClick={toggle} {...props}><PanelLeft className="h-4 w-4" /><span className="sr-only">Toggle sidebar</span></Button>;
}
export const SidebarMenu = ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => <ul className={cn("space-y-0.5", className)} {...props} />;
export const SidebarMenuItem = ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => <li className={cn("list-none", className)} {...props} />;
export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }>(({ className, isActive, ...props }, ref) => (
  <button ref={ref} data-active={isActive} className={cn("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted", isActive && "bg-muted font-medium", className)} {...props} />
));
SidebarMenuButton.displayName = "SidebarMenuButton";
export const SidebarMenuAction = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button className={cn("ml-auto", className)} {...props} />;
export const SidebarMenuBadge = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span className={cn("ml-auto text-[10px]", className)} {...props} />;
export const SidebarMenuSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("h-8 animate-pulse rounded-md bg-muted", className)} {...props} />;
export const SidebarMenuSub = ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => <ul className={cn("ml-4 space-y-0.5", className)} {...props} />;
export const SidebarMenuSubItem = ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => <li className={cn("list-none", className)} {...props} />;
export const SidebarMenuSubButton = ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className={cn("block rounded-md px-2 py-1 text-xs hover:bg-muted", className)} {...props} />;
