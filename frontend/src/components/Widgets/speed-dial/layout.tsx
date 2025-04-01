'use client';

import type { ReactNode } from 'react';
import WidgetProvider from './context';
import WidgetSpeedDial from './speed-dial';
import WidgetModal from './modal';

interface WidgetLayoutProps {
  itemId: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export default function WidgetLayout({
  itemId,
  position = 'bottom-right',
}: WidgetLayoutProps) {
  return (
    <WidgetProvider>
      <WidgetSpeedDial itemId={itemId} position={position} />
      <WidgetModal />
    </WidgetProvider>
  );
}
