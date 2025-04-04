'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import UserMenu from './UserMenu';

export default function AppBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const path = usePathname();
  const router = useRouter();
  const handleToggle = () => {
    setOpen(!open);
  };
  const onLogout = () => {
    router.push('/api/auth/logout');
  };
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white shadow-sm dark:bg-gray-900">
      <div className=" px-3 flex h-14 items-center justify-between ">
        <div className="flex items-center">
          {/* <SidebarTrigger className="mr-1" /> */}
          <Menu className="mr-5 cursor-pointer" onClick={handleToggle} />
          <h1
            className="text-lg font-semibold cursor-pointer"
            onClick={() => router.push('/')}
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
        </div>
        {/* Logout Button (Hidden on Login Page) */}
        {!path.includes('/login') && <UserMenu onLogout={onLogout} />}
      </div>
    </header>
  );
}
