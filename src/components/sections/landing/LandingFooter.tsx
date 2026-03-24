'use client';

import { useRouter } from 'next/navigation';

export default function LandingFooter() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} FrameIt. All rights reserved.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </footer>
  );
}
