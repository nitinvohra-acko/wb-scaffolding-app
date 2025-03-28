'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, AlertTriangle, UserPlus, Plus, X } from 'lucide-react';
import { useWidget } from './context';
import { motion, AnimatePresence } from 'framer-motion';

interface WidgetSpeedDialProps {
  itemId: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export default function WidgetSpeedDial({
  itemId,
  position = 'bottom-right',
}: WidgetSpeedDialProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openWidget } = useWidget();

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleWidgetOpen = (type: 'notes' | 'nudge' | 'assignment') => {
    openWidget(type, itemId);
    setIsOpen(false);
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col-reverse gap-2 m-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0 }}
            >
              <Button
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => handleWidgetOpen('notes')}
              >
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Notes</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <Button
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-amber-500 text-white hover:bg-amber-600 "
                onClick={() => handleWidgetOpen('nudge')}
              >
                <AlertTriangle className="h-5 w-5" />
                <span className="sr-only">Nudge/Escalation</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Button
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-green-500 text-white hover:bg-green-600"
                onClick={() => handleWidgetOpen('assignment')}
              >
                <UserPlus className="h-5 w-5" />
                <span className="sr-only">Assignment</span>
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="m-4 h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 "
        onClick={toggleOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        <span className="sr-only">Toggle menu</span>
      </Button>
    </div>
  );
}
