import DescriptionIcon from '@mui/icons-material/Description';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
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
    };
  }>;
} = {
  items: [
    {
      icon: DescriptionIcon,
      title: 'List',
      href: '/list',
      id: 'list',
    },
    {
      icon: PieChartOutlinedIcon,
      title: 'Dashboard',
      href: '/dashboard',
      id: 'dashboard',
    },
    {
      icon: MiscellaneousServicesIcon,
      title: 'Administrative',
      href: '/service-status',
      id: 'administrative',
    },
  ],
};
