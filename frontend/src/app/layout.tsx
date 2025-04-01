'use client';

import React from 'react';
import './globals.css';
import { AnalyticsProvider } from '@/providers/AnalyticsProvider';
import Navbars from '@/components/Navbars';
import { Toaster } from '@/components/ui/toaster';
import AuthInitializer from '@/components/AuthInitializer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthInitializer>
          <AnalyticsProvider>
            <Navbars>{children}</Navbars>
          </AnalyticsProvider>
          <Toaster />
        </AuthInitializer>
      </body>
    </html>
  );
}
