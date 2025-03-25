'use client';

import React from 'react';
import './globals.css';
import { KeycloakProvider } from '@/providers/KeycloakProvider';
import { AnalyticsProvider } from '@/providers/AnalyticsProvider';
import { ActivityProvider } from '@/providers/ActivityProvider';
import Navbars from '@/components/Navbars';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <KeycloakProvider>
          <ActivityProvider>
            <AnalyticsProvider>
              <Navbars>{children}</Navbars>
            </AnalyticsProvider>
          </ActivityProvider>
        </KeycloakProvider>
      </body>
    </html>
  );
}
