"use client";

import { useEffect } from "react";
// global-error.tsx replaces the entire HTML tree including root layout,
// so it must import globals.css directly to have any styles
import "./globals.css";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      import("@sentry/nextjs")
        .then((Sentry) => {
          Sentry.captureException(error);
        })
        .catch(() => {
          // Sentry failed to load - nothing we can do
        });
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center p-10 max-w-lg">
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">We encountered an unexpected error. Sorry about that!</p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try again &rarr;
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
