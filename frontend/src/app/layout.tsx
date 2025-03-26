'use client';

import React from 'react';
import './globals.css';
import { AnalyticsProvider } from '@/providers/AnalyticsProvider';
import Navbars from '@/components/Navbars';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AnalyticsProvider>
          <Navbars>{children}</Navbars>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
