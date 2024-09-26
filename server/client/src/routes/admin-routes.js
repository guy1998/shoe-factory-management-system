import Icon from "@mui/material/Icon";
import EmployeesContent from "../pages/admin/content/employees/index.js";
import DashboardContent from "../pages/admin/content/dashboard/index.js";
import ProductContent from "../pages/admin/content/products/index.js";
import FinancialContent from "../pages/admin/content/financial/index.js";
import UserContent from "../pages/admin/content/users/index.js";
import FierContent from "../pages/admin/content/fier/index.js";
import ExpensesContent from "../pages/admin/content/expenses/index.js";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <DashboardContent />,
  },
  {
    type: "collapse",
    name: "Operai",
    key: "employees",
    icon: <Icon fontSize="small">worker</Icon>,
    route: "/employees*",
    component: <EmployeesContent />,
  },
  {
    type: "collapse",
    name: "Articoli",
    key: "products",
    icon: <Icon fontSize="small">inventory_2</Icon>,
    route: "/products*",
    component: <ProductContent />,
  },
  {
    type: "collapse",
    name: "Relazioni finanziarie",
    key: "financial",
    icon: <Icon fontSize="small">analytics</Icon>,
    route: "/financial*",
    component: <FinancialContent />,
  },
  {
    type: "collapse",
    name: "Fier",
    key: "fier",
    icon: <Icon fontSize="small">analytics</Icon>,
    route: "/fier*",
    component: <FierContent />,
  },
  {
    type: "collapse",
    name: "Spese",
    key: "spese",
    icon: <Icon fontSize="small">credit_card_off</Icon>,
    route: "/spese*",
    component: <ExpensesContent />,
  },
  {
    type: "collapse",
    name: "Gestione degli utenti",
    key: "user",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user*",
    component: <UserContent />,
  },
];

export default routes;
