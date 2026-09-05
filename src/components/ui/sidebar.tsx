import * as React from 'react';
import { cn } from '@/lib/utils';

const SidebarContext = React.createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
  state: 'expanded' | 'collapsed';
}>({ open: true, setOpen: () => undefined, state: 'expanded' });

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  return (
    <SidebarContext.Provider value={{ open, setOpen, state: open ? 'expanded' : 'collapsed' }}>
      {children}
    </SidebarContext.Provider>
  );
}
export function useSidebar() {
  return React.useContext(SidebarContext);
}
export function Sidebar({ className, children }: React.HTMLAttributes<HTMLElement> & { collapsible?: string }) {
  return <aside className={cn('hidden w-64 shrink-0 border-r bg-background md:block', className)}>{children}</aside>;
}
export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-4', className)} {...props} />;
}
export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-2 pb-4', className)} {...props} />;
}
export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-auto p-4', className)} {...props} />;
}
export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-3', className)} {...props} />;
}
export function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-2 py-1 text-xs font-medium text-muted-foreground', className)} {...props} />;
}
export function SidebarGroupContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-1', className)} {...props} />;
}
export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn('space-y-1', className)} {...props} />;
}
export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={className} {...props} />;
}
export function SidebarMenuButton({ className, children, asChild }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn('flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-muted', className, (children as React.ReactElement).props.className),
    });
  }
  return <button type="button" className={cn('flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-muted', className)}>{children}</button>;
}
export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSidebar();
  return <button type="button" className={cn('rounded-md p-2 text-sm', className)} onClick={() => setOpen(!open)} {...props}>Menu</button>;
}
export function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1', className)} {...props} />;
}
