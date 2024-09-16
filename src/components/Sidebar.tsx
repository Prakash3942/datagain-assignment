import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TableChartIcon from "@mui/icons-material/TableChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ProductTable from "./ProductTable";
import CalenderTable from "./CalenderTable";
import Profile from "./demo-component/Profile";
import Subscribe from "./demo-component/Subscribe";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface DrawerProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open ? openedMixin(theme) : closedMixin(theme)),
  "& .MuiDrawer-paper": open ? openedMixin(theme) : closedMixin(theme),
}));

const sidebarMenu = [
  {
    name: "Table Data",
    icon: <TableChartIcon />,
    component: <ProductTable />,
  },
  {
    name: "Calendar",
    icon: <CalendarMonthIcon />,
    component: <CalenderTable />,
  },
  {
    name: "Profile",
    icon: <AccountCircleIcon />,
    component: <Profile />,
  },
  {
    name: "Subscribe",
    icon: <SubscriptionsIcon />,
    component: <Subscribe />,
  },
];

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedComponent, setSelectedComponent] = React.useState<JSX.Element>(
    sidebarMenu[0].component
  );

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (component: JSX.Element) => {
    setSelectedComponent(component);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open ? (
              <ChevronLeftIcon sx={{ color: "#000", fontSize: "30px" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "#000", fontSize: "30px" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarMenu.map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              sx={{ display: "block", p: 1 }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                  borderRadius: "10px",
                  backgroundColor:
                    selectedComponent === item.component
                      ? "#a6eced"
                      : "transparent",
                  "&:hover": {
                    backgroundColor:
                      selectedComponent === item.component
                        ? "#a6eced"
                        : theme.palette.action.hover,
                  },
                }}
                onClick={() => handleMenuClick(item.component)}
              >
                <ListItemIcon
                  sx={{
                    color: "#000",
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? 3 : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0, color: "#000", fontWeight: 700 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {selectedComponent}
      </Box>
    </Box>
  );
}
