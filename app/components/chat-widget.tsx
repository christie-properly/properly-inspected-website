'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Minimize2 } from 'lucide-react';

interface ChatWidgetProps {
  embedCode?: string;
  position?: 'bottom-right' | 'bottom-left';
  hideOnPaths?: string[];
}

export default function ChatWidget({ 
  embedCode, 
  position = 'bottom-right',
  hideOnPaths = ['/admin']
}: ChatWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUnreadIndicator, setShowUnreadIndicator] = useState(false);
  const pathname = usePathname();

  // Check if widget should be hidden on current path
  const shouldHide = hideOnPaths.some(path => pathname?.startsWith(path));

  // Load Echo Desk chat script dynamically
  useEffect(() => {
    if (!embedCode || shouldHide) {
      return;
    }

    // Check if the embed code contains a script tag
    const scriptMatch = embedCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    const srcMatch = embedCode.match(/src=["']([^"']+)["']/i);
    
    if (srcMatch) {
      // External script source found
      const scriptSrc = srcMatch[1];
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => console.error('[Chat Widget] Failed to load Echo Desk chat script');
      
      // Extract any additional attributes from the original script tag
      const idMatch = embedCode.match(/id=["']([^"']+)["']/i);
      if (idMatch) {
        script.id = idMatch[1];
      }
      
      document.body.appendChild(script);

      return () => {
        // Cleanup: remove script on unmount
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else if (scriptMatch) {
      // Inline script found
      const scriptContent = scriptMatch[1];
      const script = document.createElement('script');
      script.textContent = scriptContent;
      script.async = true;
      document.body.appendChild(script);
      setIsLoaded(true);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else {
      // Try to inject the code as-is (in case it's a div or other element)
      const container = document.createElement('div');
      container.innerHTML = embedCode;
      document.body.appendChild(container);
      setIsLoaded(true);

      return () => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      };
    }
  }, [embedCode, shouldHide]);

  // Simulate unread indicator (in production, this would be driven by actual chat events)
  useEffect(() => {
    if (isLoaded && isMinimized) {
      const timer = setTimeout(() => {
        setShowUnreadIndicator(true);
      }, 10000); // Show after 10 seconds as a gentle prompt

      return () => clearTimeout(timer);
    }
  }, [isLoaded, isMinimized]);

  // Don't render if no embed code or on hidden paths
  if (!embedCode || shouldHide) {
    return null;
  }

  const positionClasses = position === 'bottom-right' 
    ? 'right-4 sm:right-6' 
    : 'left-4 sm:left-6';

  return (
    <>
      {/* Custom Chat Button (only shown if using custom implementation) */}
      {/* Echo Desk provides its own button, so this is a fallback/alternative */}
      <div className={`fixed bottom-4 sm:bottom-6 ${positionClasses} z-50`}>
        {/* Floating Chat Button */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="group relative bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300"
          aria-label={isMinimized ? "Open chat" : "Close chat"}
        >
          {/* Unread Indicator */}
          {showUnreadIndicator && isMinimized && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full border-2 border-white animate-pulse flex items-center justify-center">
              <span className="text-xs font-bold">1</span>
            </span>
          )}
          
          {/* Icon */}
          {isMinimized ? (
            <MessageCircle className="h-6 w-6" />
          ) : (
            <X className="h-6 w-6" />
          )}
          
          {/* Tooltip */}
          <span className="absolute bottom-full mb-2 right-0 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {isMinimized ? 'Chat with us!' : 'Close chat'}
          </span>
        </button>

        {/* Helper text on first load */}
        {isLoaded && isMinimized && showUnreadIndicator && (
          <div className="absolute bottom-full mb-4 right-0 bg-white rounded-lg shadow-xl p-4 w-64 animate-fade-in">
            <button
              onClick={() => setShowUnreadIndicator(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-sm text-gray-800 font-medium mb-1">
              👋 Need help?
            </p>
            <p className="text-xs text-gray-600">
              Click the button below to chat with us! We typically respond within minutes.
            </p>
          </div>
        )}
      </div>

      {/* Fallback: Custom Chat Panel (if Echo Desk doesn't provide its own UI) */}
      {/* This would be hidden when Echo Desk's widget is active */}
      <style jsx global>{`
        /* Ensure Echo Desk widget appears above other content */
        [id^="echo-chat"],
        [class*="echo-chat"],
        [class*="echodesk"] {
          z-index: 9999 !important;
        }

        /* Custom animations */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        /* Responsive adjustments for chat widget */
        @media (max-width: 640px) {
          [id^="echo-chat"],
          [class*="echo-chat"],
          [class*="echodesk"] {
            max-width: calc(100vw - 2rem) !important;
            max-height: calc(100vh - 8rem) !important;
          }
        }

        /* Hide our custom button if Echo Desk provides its own */
        body:has([class*="echo-chat-button"]) .chat-widget-custom-button {
          display: none;
        }
      `}</style>
    </>
  );
}

/**
 * Simplified version for direct Echo Desk embed without custom button
 * This version just loads the script and lets Echo Desk handle everything
 */
export function EchoDeskChatWidget() {
  const embedCode = process.env.NEXT_PUBLIC_ECHO_DESK_CHAT_EMBED_CODE;
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);

  // Don't show on admin pages
  const shouldHide = pathname?.startsWith('/admin');

  useEffect(() => {
    if (!embedCode || shouldHide || isLoaded) {
      return;
    }

    // Parse and inject the Echo Desk embed code
    const scriptMatch = embedCode.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/i);
    
    if (scriptMatch) {
      const scriptSrc = scriptMatch[1];
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => {
        console.log('[Echo Desk Chat] Widget loaded successfully');
        setIsLoaded(true);
      };
      script.onerror = () => {
        console.error('[Echo Desk Chat] Failed to load widget');
      };
      
      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else {
      // If not a script tag, try injecting directly
      console.warn('[Echo Desk Chat] Embed code format not recognized. Injecting directly.');
      const container = document.createElement('div');
      container.innerHTML = embedCode;
      document.body.appendChild(container);
      setIsLoaded(true);

      return () => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      };
    }
  }, [embedCode, shouldHide, isLoaded]);

  // This component doesn't render anything visible - it just loads the script
  return null;
}
