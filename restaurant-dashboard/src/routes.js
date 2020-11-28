// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import EventBusyIcon from '@material-ui/icons/EventBusy';
import StoreIcon from '@material-ui/icons/Store';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import OpenTableList from "views/OpenTableList/OpenTableList.js";
// core components/views for RTL layout
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import MenuList from './components/MenuList/MenuList';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/restaurant",
    name: "Restaurant Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: StoreIcon,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/open-orders",
    name: "Orders",
    rtlName: "قائمة الجدول",
    icon: EventBusyIcon,
    component: OpenTableList,
    layout: "/admin"
  },
  {
    path: "/menu",
    name: "Menu",
    rtlName: "طباعة",
    icon: RestaurantMenuIcon,
    component: MenuList,
    layout: "/admin"
  },
];

export default dashboardRoutes;
