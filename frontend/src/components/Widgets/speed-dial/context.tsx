'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type WidgetType = 'notes' | 'nudge' | 'assignment' | null;

interface WidgetContextType {
  openWidget: (type: WidgetType, id: string) => void;
  closeWidget: () => void;
  currentWidget: WidgetType;
  currentId: string | null;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export default function WidgetProvider({ children }: { children: ReactNode }) {
  const [currentWidget, setCurrentWidget] = useState<WidgetType>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const openWidget = (type: WidgetType, id: string) => {
    setCurrentWidget(type);
    setCurrentId(id);
  };

  const closeWidget = () => {
    setCurrentWidget(null);
    setCurrentId(null);
  };

  return (
    <WidgetContext.Provider
      value={{
        openWidget,
        closeWidget,
        currentWidget,
        currentId,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidget() {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error('useWidget must be used within a WidgetProvider');
  }
  return context;
}
