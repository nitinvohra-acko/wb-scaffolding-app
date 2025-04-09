'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Textarea from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Send, RefreshCw } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface NotesWidgetProps {
  id: string; // ID of the item/task the notes are related to
  title?: string;
  placeholder?: string;
}

export function NotesWidget({
  id,
  title = 'Notes',
  placeholder = 'Add a note...',
}: NotesWidgetProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/notes?id=${id}`);
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitNote = async () => {
    if (!newNote.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          content: newNote,
        }),
      });

      if (!response.ok) throw new Error('Failed to add note');

      // Refresh notes after successful submission
      await fetchNotes();
      setNewNote('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add note');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchNotes}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={note.author.avatar} />
                  <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium">{note.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(note.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm">{note.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No notes yet
            </p>
          )}

          {error && (
            <div className="p-2 bg-destructive/10 text-destructive text-sm rounded">
              {error}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Textarea
          placeholder={placeholder}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="min-h-[80px] resize-none"
        />
        <Button
          size="icon"
          onClick={submitNote}
          disabled={isSubmitting || !newNote.trim()}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
