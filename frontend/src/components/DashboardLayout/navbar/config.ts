import DescriptionIcon from "@mui/icons-material/Description";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TaskSharpIcon from "@mui/icons-material/TaskSharp";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
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
      icon: PieChartOutlinedIcon,
      title: "Dashboard",
      href: "/dashboard",
      id: "dashboard",
    },
    {
      icon: DescriptionIcon,
      title: "List",
      href: "/list",
      id: "list",
    },
  ],
};
