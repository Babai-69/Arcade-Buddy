import React, { useState, useEffect, useCallback } from 'react';

export type NotificationType = 'loading' | 'success' | 'error' | 'info';

export interface ArcadeNotificationItem {
  id: string;
  message: string;
  type?: NotificationType;
  duration?: number; // In milliseconds. If undefined or <= 0 in loading mode, it remains until updated/dismissed
  icon?: React.ReactNode;
  onDismiss?: () => void;
  isExiting?: boolean;
}

export type ShowNotificationOptions = Omit<Partial<ArcadeNotificationItem>, 'message'>;

// Global event bus for lightweight, zero-dependency cross-app notifications
type NotificationListener = (items: ArcadeNotificationItem[]) => void;
let listeners: NotificationListener[] = [];
let activeNotifications: ArcadeNotificationItem[] = [];

function notifyListeners() {
  listeners.forEach((l) => l([...activeNotifications]));
}

let notificationCounter = 0;

/**
 * Show a retro arcade notification.
 * Usage:
 *   showNotification("Updating Profile Data...");
 *   showNotification({ message: "Profile Data Updated!", type: "success", duration: 2500 });
 */
export function showNotification(
  messageOrOptions: string | (ShowNotificationOptions & { message: string })
): string {
  const options =
    typeof messageOrOptions === 'string'
      ? { message: messageOrOptions }
      : messageOrOptions;

  const id = options.id || `arcade-toast-${++notificationCounter}-${Date.now()}`;
  const type: NotificationType = options.type || 'loading';

  // If already exists, update in-place smoothly
  const existingIndex = activeNotifications.findIndex((n) => n.id === id);

  const defaultDuration =
    options.duration !== undefined
      ? options.duration
      : type === 'loading'
      ? 0 // loading toasts stay until dismissed or converted to success/error
      : 2800; // 2.8 seconds auto-dismiss for success/error/info

  const newItem: ArcadeNotificationItem = {
    id,
    message: options.message,
    type,
    duration: defaultDuration,
    icon: options.icon,
    onDismiss: options.onDismiss,
    isExiting: false,
  };

  if (existingIndex !== -1) {
    activeNotifications[existingIndex] = newItem;
  } else {
    // Keep max 3 notifications visible to avoid clutter
    if (activeNotifications.length >= 3) {
      activeNotifications.shift();
    }
    activeNotifications.push(newItem);
  }

  notifyListeners();
  return id;
}

/** Alias for showNotification */
export const showArcadeNotification = showNotification;

/** Dismiss a notification by ID with slide-out animation */
export function dismissNotification(id: string) {
  const item = activeNotifications.find((n) => n.id === id);
  if (!item || item.isExiting) return;

  item.isExiting = true;
  notifyListeners();

  // Remove completely after slide-out animation completes
  setTimeout(() => {
    activeNotifications = activeNotifications.filter((n) => n.id !== id);
    if (item.onDismiss) item.onDismiss();
    notifyListeners();
  }, 280);
}

export const dismissArcadeNotification = dismissNotification;

// Expose on window object for console / global usage as requested
if (typeof window !== 'undefined') {
  (window as any).showNotification = showNotification;
  (window as any).showArcadeNotification = showNotification;
  (window as any).dismissNotification = dismissNotification;
}

/** Hook to access notifications within React components */
export function useArcadeNotification() {
  return {
    show: showNotification,
    dismiss: dismissNotification,
  };
}

interface ContainerProps {
  position?: 'bottom-right' | 'top-right';
}

/**
 * Reusable Arcade Notification Container component.
 * Positioned in the right side corner directly above the chatbot by default,
 * strictly matching the retro comic-book / pixel-art UI specification.
 */
export function ArcadeNotificationContainer({ position = 'bottom-right' }: ContainerProps) {
  const [items, setItems] = useState<ArcadeNotificationItem[]>([]);

  useEffect(() => {
    const handler = (newItems: ArcadeNotificationItem[]) => {
      setItems(newItems);
    };
    listeners.push(handler);
    handler(activeNotifications);

    return () => {
      listeners = listeners.filter((l) => l !== handler);
    };
  }, []);

  // Handle auto-dismiss timers
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    items.forEach((item) => {
      if (item.duration && item.duration > 0 && !item.isExiting) {
        const timer = setTimeout(() => {
          dismissNotification(item.id);
        }, item.duration);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [items]);

  if (items.length === 0) return null;

  const positionClasses =
    position === 'top-right'
      ? 'top-20 right-4 md:right-6'
      : 'bottom-24 right-4 md:right-6'; // Directly above the chatbot button (bottom-6)

  return (
    <div
      className={`fixed ${positionClasses} z-[9999] flex flex-col gap-2.5 pointer-events-none items-end max-w-[calc(100vw-32px)]`}
      role="region"
      aria-live="polite"
      aria-label="Arcade Notifications"
    >
      {items.map((item) => (
        <ArcadeToastCard key={item.id} item={item} onDismiss={() => dismissNotification(item.id)} />
      ))}
    </div>
  );
}

function ArcadeToastCard({
  item,
  onDismiss,
}: {
  item: ArcadeNotificationItem;
  onDismiss: () => void;
}) {
  const isExiting = item.isExiting;
  const type = item.type || 'loading';

  return (
    <div
      className={`pointer-events-auto select-none transition-all ${
        isExiting ? 'animate-arcade-slide-out' : 'animate-arcade-slide-in'
      }`}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {/* 
        Retro Arcade Toast Card:
        - Bright arcade yellow: #FFE600
        - Thick crisp 3px black border
        - Solid offset black comic drop shadow: 4px 4px 0px #000
        - Slightly rounded corners: 8px
        - Compact horizontal layout
        - High-contrast comic/retro typography
      */}
      <div
        className="flex items-center gap-2.5 px-3.5 py-2.5 md:px-4 md:py-3 bg-[#FFE600] text-black border-[3px] border-black rounded-[8px] shadow-[4px_4px_0px_#000000] relative"
        style={{
          boxShadow: '4px 4px 0px #000000',
        }}
      >
        {/* Left Side: Pixel / Halftone Graphic Element */}
        <div className="flex-shrink-0 flex items-center justify-center">
          {item.icon ? (
            item.icon
          ) : type === 'success' ? (
            /* Retro Pixel Checkmark */
            <div className="w-5 h-5 bg-black flex items-center justify-center rounded-[3px]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="5" width="2" height="2" fill="#FFE600" />
                <rect x="4" y="7" width="2" height="2" fill="#FFE600" />
                <rect x="6" y="9" width="2" height="2" fill="#FFE600" />
                <rect x="8" y="5" width="2" height="2" fill="#FFE600" />
                <rect x="10" y="3" width="2" height="2" fill="#FFE600" />
              </svg>
            </div>
          ) : type === 'error' ? (
            /* Retro Pixel Exclamation */
            <div className="w-5 h-5 bg-black flex items-center justify-center rounded-[3px]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="2" width="2" height="5" fill="#FFE600" />
                <rect x="5" y="8.5" width="2" height="2" fill="#FFE600" />
              </svg>
            </div>
          ) : (
            /* Retro Pixel Halftone 4x4 Grid Matrix */
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 4x4 Halftone / Pixel Grid */}
                <rect x="1" y="1" width="2.5" height="2.5" fill="#000000" />
                <rect x="5" y="1" width="2.5" height="2.5" fill="#000000" />
                <rect x="9" y="1" width="2.5" height="2.5" fill="#000000" />
                <rect x="13" y="1" width="2.5" height="2.5" fill="#000000" opacity="0.5" />

                <rect x="1" y="5" width="2.5" height="2.5" fill="#000000" />
                <rect x="5" y="5" width="2.5" height="2.5" fill="#000000" />
                <rect x="9" y="5" width="2.5" height="2.5" fill="#000000" />
                <rect x="13" y="5" width="2.5" height="2.5" fill="#000000" />

                <rect x="1" y="9" width="2.5" height="2.5" fill="#000000" />
                <rect x="5" y="9" width="2.5" height="2.5" fill="#000000" />
                <rect x="9" y="9" width="2.5" height="2.5" fill="#000000" opacity="0.75" />
                <rect x="13" y="9" width="2.5" height="2.5" fill="#000000" opacity="0.35" />

                <rect x="1" y="13" width="2.5" height="2.5" fill="#000000" opacity="0.5" />
                <rect x="5" y="13" width="2.5" height="2.5" fill="#000000" />
                <rect x="9" y="13" width="2.5" height="2.5" fill="#000000" opacity="0.4" />
                <rect x="13" y="13" width="2.5" height="2.5" fill="#000000" opacity="0.2" />
              </svg>
            </div>
          )}
        </div>

        {/* Message Text with Retro Comic Typography */}
        <div className="flex items-center text-xs md:text-sm font-display font-black tracking-wide uppercase text-black whitespace-nowrap">
          <span>{item.message || 'Updating Profile Data...'}</span>

          {/* Animated 3 Loading Dots (only in loading state) */}
          {type === 'loading' && (
            <span className="inline-flex items-center gap-[3.5px] ml-1.5" aria-hidden="true">
              <span
                className="w-1.5 h-1.5 bg-black rounded-none"
                style={{
                  animation: 'arcadeDotBounce 1.1s infinite ease-in-out',
                  animationDelay: '0s',
                }}
              />
              <span
                className="w-1.5 h-1.5 bg-black rounded-none"
                style={{
                  animation: 'arcadeDotBounce 1.1s infinite ease-in-out',
                  animationDelay: '0.2s',
                }}
              />
              <span
                className="w-1.5 h-1.5 bg-black rounded-none"
                style={{
                  animation: 'arcadeDotBounce 1.1s infinite ease-in-out',
                  animationDelay: '0.4s',
                }}
              />
            </span>
          )}
        </div>

        {/* Manual Dismiss Button (Retro '✕') */}
        <button
          onClick={onDismiss}
          className="ml-2 -mr-1 p-0.5 text-black/60 hover:text-black hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          title="Dismiss notification"
          aria-label="Dismiss notification"
        >
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
            <line x1="2" y1="2" x2="10" y2="10" />
            <line x1="10" y1="2" x2="2" y2="10" />
          </svg>
        </button>
      </div>
    </div>
  );
}
