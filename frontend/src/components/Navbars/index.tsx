import { FC, ReactNode, useState } from 'react';
import { AppSidebar } from './SideNav/app-sidebar';
import TopBar from './Topbar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

const Page: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  return (
    <SidebarProvider open={open}>
      <TopBar open={open} setOpen={setOpen} />
      {!pathName?.includes('/login') && <AppSidebar />}
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-6 mt-14">
          {children}
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default Page;
