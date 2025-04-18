'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface NudgeEscalationProps {
  id: string; // ID of the item/task to escalate
  onEscalate?: (data: NudgeData) => Promise<void>;
  onResolve?: (id: string) => Promise<void>;
  initialStatus?: 'open' | 'resolved';
}

interface NudgeData {
  id: string;
  level: string;
  group: string;
  reason: string;
}

const escalationLevels = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'critical', label: 'Critical' },
];

const groups = [
  { value: 'ops', label: 'Operations' },
  { value: 'doctor', label: 'Medical Staff' },
  { value: 'comms', label: 'Communications' },
  { value: 'tech', label: 'Technical Support' },
  { value: 'admin', label: 'Administration' },
];

export function NudgeEscalation({
  id,
  onEscalate,
  onResolve,
  initialStatus = 'open',
}: NudgeEscalationProps) {
  const [level, setLevel] = useState('');
  const [group, setGroup] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState<'open' | 'resolved' | 'submitting'>(
    initialStatus,
  );
  const [error, setError] = useState<string | null>(null);

  const handleEscalate = async () => {
    if (!level || !group || !reason.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setStatus('submitting');
    setError(null);

    try {
      if (onEscalate) {
        await onEscalate({ id, level, group, reason });
      } else {
        // Default implementation if no handler is provided
        // Replace with your actual API endpoint
        const response = await fetch('/api/nudge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, level, group, reason }),
        });

        if (!response.ok) throw new Error('Failed to create nudge');
      }

      setStatus('open');
      // Reset form after successful submission
      setReason('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create nudge');
      setStatus('open');
      console.error(err);
    }
  };

  const handleResolve = async () => {
    setStatus('submitting');
    setError(null);

    try {
      if (onResolve) {
        await onResolve(id);
      } else {
        // Default implementation if no handler is provided
        // Replace with your actual API endpoint
        const response = await fetch(`/api/nudge/${id}/resolve`, {
          method: 'PUT',
        });

        if (!response.ok) throw new Error('Failed to resolve nudge');
      }

      setStatus('resolved');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resolve nudge');
      setStatus('open');
      console.error(err);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-blue-500/10 text-blue-500';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'high':
        return 'bg-orange-500/10 text-orange-500';
      case 'critical':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md font-medium">
            Nudge / Escalation
          </CardTitle>
          {status === 'open' && (
            <Badge
              variant="outline"
              className="bg-yellow-500/10 text-yellow-500"
            >
              Open
            </Badge>
          )}
          {status === 'resolved' && (
            <Badge variant="outline" className="bg-green-500/10 text-green-500">
              Resolved
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {status === 'open' || status === 'submitting' ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Escalation Level</label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  {escalationLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-2">
                        <span>{level.label}</span>
                        {level.value === 'critical' && (
                          <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Assign to Group</label>
              <Select value={group} onValueChange={setGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department/group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reason</label>
              <Textarea
                placeholder="Describe the issue requiring escalation..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {error && (
              <div className="p-2 bg-destructive/10 text-destructive text-sm rounded">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="py-2">
            <div className="flex items-center gap-2 mb-4">
              <Badge className={level ? getLevelColor(level) : ''}>
                {level
                  ? escalationLevels.find((l) => l.value === level)?.label
                  : 'Unknown'}
              </Badge>
              <span className="text-sm">•</span>
              <span className="text-sm">
                {group
                  ? groups.find((g) => g.value === group)?.label
                  : 'Unknown group'}
              </span>
            </div>
            <p className="text-sm">{reason}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {status === 'open' && (
          <>
            <Button variant="outline" onClick={handleEscalate}>
              {level && group && reason ? 'Update' : 'Create'} Nudge
            </Button>

            {level && group && reason && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Resolve
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Resolve this nudge?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will mark the nudge as resolved and notify the team.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResolve}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        )}

        {status === 'resolved' && (
          <Button variant="outline" onClick={() => setStatus('open')}>
            Reopen
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
