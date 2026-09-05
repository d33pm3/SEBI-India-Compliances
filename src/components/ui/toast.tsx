import * as React from 'react';
import { cn } from '@/lib/utils';

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & { open?: boolean; onOpenChange?: (open: boolean) => void };
export type ToastActionElement = React.ReactElement;

export function ToastProvider({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
export function ToastViewport({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('fixed bottom-4 right-4 z-50 flex flex-col gap-2', className)} {...props} />;
}
export function Toast({ className, ...props }: ToastProps) {
  return <div className={cn('rounded-md border bg-background p-3 shadow', className)} {...props} />;
}
export function ToastTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm font-semibold', className)} {...props} />;
}
export function ToastDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
export function ToastClose({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn('text-xs', className)} {...props}>Close</button>;
}
export function ToastAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={className} {...props} />;
}
