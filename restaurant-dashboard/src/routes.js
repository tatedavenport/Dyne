/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import EventBusyIcon from '@material-ui/icons/EventBusy';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import StoreIcon from '@material-ui/icons/Store';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import OpenTableList from "views/OpenTableList/OpenTableList.js";
import ClosedTableList from "views/ClosedTableList/ClosedTableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
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
    name: "Open Orders",
    rtlName: "قائمة الجدول",
    icon: EventBusyIcon,
    component: OpenTableList,
    layout: "/admin"
  },
  {
    path: "/closed-orders",
    name: "Closed Orders",
    rtlName: "طباعة",
    icon: EventAvailableIcon,
    component: ClosedTableList,
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
