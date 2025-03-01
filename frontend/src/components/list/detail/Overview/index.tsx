import {
  Box,
  Typography,
  Divider,
  Tabs,
  Tab,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  CardContent,
  Tooltip,
  Avatar,
  Chip,
  Icon,
  styled,
} from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const LeftSection: React.FC<{ taskData: any }> = ({ taskData }) => {
  if (!taskData) {
    return <Typography>Nothing to display</Typography>;
  }
  return (
    <Card
      sx={{
        width: "25%",
        // bgcolor: "#F2F2FDFF",
        padding: 2,
        borderRight: "1px solid #ddd",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#752cff" }}>{taskData?.assignee?.[0]}</Avatar>
        }
        subheader={
          <>
            <Typography variant="h6">{taskData?.assignee}</Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Tooltip title={"title"}>
                <Typography
                  variant="subtitle2"
                  // mr={1}
                  sx={{
                    maxWidth: "85%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Icon>
                    <EmailOutlinedIcon
                      sx={{ fontSize: "1rem", margin: "0 5px" }}
                      color={"inherit"}
                    />
                  </Icon>

                  <>"Email"</>
                </Typography>
              </Tooltip>
              <Typography variant="subtitle2" mr={1}>
                <Icon>
                  <LocalPhoneOutlinedIcon
                    sx={{ fontSize: "1rem", margin: "0 5px 1px" }}
                    color={"inherit"}
                  />
                </Icon>
                {"phone"}
              </Typography>
            </div>
          </>
        }
      ></CardHeader>
      <CardContent>
        {/* Plan Details */}
        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Task details
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary={"Type"} secondary={taskData?.type} />
            </ListItem>
            <ListItem>
              <ListItemText primary={"Status"} secondary={taskData?.status} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Updated at"}
                secondary={taskData?.updated_date}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Created at"}
                secondary={taskData?.created_at}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"priority"}
                secondary={taskData?.priority}
              />
            </ListItem>
          </List>
        </Box>

        {/* General Info */}
        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold">
            General info
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Language preference" secondary="Hindi" />
            </ListItem>
            <ListItem>
              <ListItemText primary="SPOC" secondary="Dr. Sandeep Nair" />
            </ListItem>
          </List>
        </Box>

        {/* Existing Policy Details */}
        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Existing ACKO policy details
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="GMC customer" secondary="Yes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Auto customer (car)" secondary="Yes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Auto customer (bike)" secondary="Yes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Life customer" secondary="No" />
            </ListItem>
          </List>
        </Box>

        {/* Claims Details */}
        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Claims details
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Health claim in past X years"
                secondary="No"
              />
            </ListItem>
          </List>
        </Box>

        {/* Actions */}
        <Box mt={3}>
          <Button variant="contained" color="primary" fullWidth>
            Plan change
          </Button>
          <Button variant="outlined" color="primary" fullWidth sx={{ mt: 1 }}>
            Proposal edit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
const Container = styled("div")({});
export default LeftSection;
