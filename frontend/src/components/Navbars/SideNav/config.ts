import { LayoutDashboard, ListTodo, UserCog } from 'lucide-react';

export const retail: {
  items: Array<{
    icon: any;
    title: string;
    href: string;
    id: string;
    children?: {
      icon: any;
      title: string;
      href: string;
      id: string;
    }[];
  }>;
} = {
  items: [
    {
      icon: ListTodo,
      title: 'List',
      href: '/list',
      id: 'list',
    },
    {
      icon: LayoutDashboard,
      title: 'Dashboard',
      href: '/dashboard',
      id: 'dashboard',
    },
    {
      icon: UserCog,
      title: 'Administrative',
      href: '/administrative',
      id: 'administrative',
    },
  ],
};
