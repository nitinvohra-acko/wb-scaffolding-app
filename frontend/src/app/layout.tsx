'use client';

import React from 'react';
import './globals.css';
import Navbars from '@/components/Navbars';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Navbars>{children}</Navbars>
      </body>
    </html>
  );
}
