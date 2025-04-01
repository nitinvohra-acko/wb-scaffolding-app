'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useWidget } from './context';
import { NotesWidget } from '../notes';
import { NudgeEscalation } from '../nudge-escalation';
import { TaskAssignment } from '../task-assigment';

export default function WidgetModal() {
  const { currentWidget, currentId, closeWidget } = useWidget();

  // Close modal with escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWidget();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeWidget]);

  const getWidgetTitle = () => {
    switch (currentWidget) {
      case 'notes':
        return 'Notes';
      case 'nudge':
        return 'Nudge / Escalation';
      case 'assignment':
        return 'Task Assignment';
      default:
        return '';
    }
  };

  const renderWidget = () => {
    if (!currentId) return null;

    switch (currentWidget) {
      case 'notes':
        return (
          <NotesWidget
            id={currentId}
            title="Task Notes"
            placeholder="Add a note about this task..."
          />
        );
      case 'nudge':
        return (
          <NudgeEscalation
            id={currentId}
            onEscalate={async (data) => {
              console.log('Escalating:', data);
              // In a real app, you would make an API call here
              return new Promise((resolve) => setTimeout(resolve, 1000));
            }}
            onResolve={async (id) => {
              console.log('Resolving nudge:', id);
              // In a real app, you would make an API call here
              return new Promise((resolve) => setTimeout(resolve, 1000));
            }}
          />
        );
      case 'assignment':
        return (
          <TaskAssignment
            taskId={currentId}
            onAssign={async (taskId, userId) => {
              console.log('Assigning task', taskId, 'to user', userId);
              // In a real app, you would make an API call here
              return new Promise((resolve) => setTimeout(resolve, 1000));
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={currentWidget !== null}
      onOpenChange={(open) => !open && closeWidget()}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getWidgetTitle()}</DialogTitle>
        </DialogHeader>
        <div className="mt-2">{renderWidget()}</div>
      </DialogContent>
    </Dialog>
  );
}
