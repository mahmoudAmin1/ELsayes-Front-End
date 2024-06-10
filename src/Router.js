import { createBrowserRouter } from "react-router-dom";
import Home from "./manager/Home";
import OwnerHome from "./Owner/OwnerHome";
import MyLayout from "./components/Layout";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import ShowWorkers from "./manager/workerPages/ShowWorkers";
import ShowServices from "./manager/servicesPages/ShowServices";
import DeleteService from "./manager/servicesPages/DeleteService";
import DeleteWorker from "./manager/workerPages/DeleteWorker";
import AddWorker from "./manager/workerPages/AddWorker";
import AddService from "./manager/servicesPages/AddService";
import UpdateWorker from "./manager/workerPages/UpdateWorker";
import Register from "./Pages/Register";
import ShowAllWorkers from "./manager/workerPages/ShowAllWorkers";
import ShowAllServices from "./manager/servicesPages/ShowAllServices";
import UpdateService from "./manager/servicesPages/UpdateService";
import AddOffer from "./manager/offersPages/AddPackage";
import AddServiceToBranch from "./manager/servicesPages/AddServiceToBranch";
import AddPackageToBranch from "./manager/offersPages/AddPackageToBranch";
import ShowPackages from "./manager/offersPages/ShowPackages";
import ShowAllPackages from "./manager/offersPages/ShowAllPackages";
import DeletePackages from "./manager/offersPages/DeletePackage";
import TopManager from "./middleware/TopManager";
import Guest from "./middleware/Guest";
import Manager from "./middleware/Manager";
import Owner from "./middleware/Owner";
import ShowManagers from "./Owner/managers/ShowManagers";
import ShowBranches from "./Owner/branches/ShowBranches";
import ShowOwners from "./Owner/owners/ShowOwners";
import AddBranch from "./Owner/branches/AddBranch";
import AddOwner from "./Owner/owners/AddOwner";
import AddManager from "./Owner/managers/AddManager";
import UpdateOwner from "./Owner/owners/UpdateOwner";
import UpdateManager from "./Owner/managers/UpdateManager";
import UpdateBranch from "./Owner/branches/UpdateBranch";
import DeleteOwner from "./Owner/owners/DeleteOwner";
import DeleteManager from "./Owner/managers/DeleteManager";
import DeleteBranch from "./Owner/branches/DeleteBranch";
import ShowCustomers from "./manager/CustomerPages/ShowCustomers";
import DeleteCustomer from "./manager/CustomerPages/DeleteCustomer";
import UpdateCustomer from "./manager/CustomerPages/UpdateCustomer";
import FirstTimeRegister from "./middleware/FirstTimeRegister";
export const router = createBrowserRouter([
  {
    element: <TopManager />,
    children: [
      {
        path: "/Top_Manager",
        children: [
          {
            path: "/Top_Manager/ELsayes-Front-End",
            element: <MyLayout children={<Home />} />,
          },
          {
            path: "/Top_Manager/",
            element: <MyLayout children={<Home />} />,
          },
          {
            path: "/Top_Manager/Show/workers",
            element: <MyLayout children={<ShowWorkers />} />,
          },
          {
            path: "/Top_Manager/Show/packages",
            element: <MyLayout children={<ShowPackages />} />,
          },
          {
            path: "/Top_Manager/Show/services",
            element: <MyLayout children={<ShowServices />} />,
          },
          {
            path: "/Top_Manager/Show/AllServices",
            element: <MyLayout children={<ShowAllServices />} />,
          },
          {
            path: "/Top_Manager/Show/AllWorkers",
            element: <MyLayout children={<ShowAllWorkers />} />,
          },
          {
            path: "/Top_Manager/Show/AllPackages",
            element: <MyLayout children={<ShowAllPackages />} />,
          },
          {
            path: "/Top_Manager/Update/Workers/:id",
            element: <MyLayout children={<UpdateWorker />} />,
          },
          {
            path: "/Top_Manager/Update/services/:id",
            element: <MyLayout children={<UpdateService />} />,
          },
          {
            path: "/Top_Manager/Delete/services/:id",
            element: <MyLayout children={<DeleteService />} />,
          },
          {
            path: "/Top_Manager/Delete/workers/:id",
            element: <MyLayout children={<DeleteWorker />} />,
          },
          {
            path: "/Top_Manager/Delete/Packages/:id",
            element: <MyLayout children={<DeletePackages />} />,
          },
          {
            path: "/Top_Manager/Add/Worker",
            element: <MyLayout children={<AddWorker />} />,
          },
          {
            path: "/Top_Manager/Add/Service",
            element: <MyLayout children={<AddService />} />,
          },
          {
            path: "/Top_Manager/Add/servicesToBranch/:id",
            element: <MyLayout children={<AddServiceToBranch />} />,
          },
          {
            path: "/Top_Manager/Add/packagesToBranch/:id",
            element: <MyLayout children={<AddPackageToBranch />} />,
          },
          {
            path: "/Top_Manager/Add/Package",
            element: <MyLayout children={<AddOffer />} />,
          },
          {
            path: "/Top_Manager/Profile",
            element: <MyLayout children={<Profile />} />,
          },
          {
            path: "/Top_Manager/Show/Customers",
            element: <MyLayout children={<ShowCustomers />} />,
          },
          {
            path: "/Top_Manager/Delete/Customers/:id",
            element: <MyLayout children={<DeleteCustomer />} />,
          },
          {
            path: "/Top_Manager/Update/Customers/:id",
            element: <MyLayout children={<UpdateCustomer />} />,
          },
        ],
      },
    ],
  },
  {
    element: <Guest />,
    children: [
      {
        path: "/Login",
        element: <Login />,
      },
    ],
  },
  {
    element: <FirstTimeRegister />,
    children: [
      {
        path: "/Register",
        element: <Register />,
      },
    ],
  },
  {
    element: <Manager />,
    children: [
      {
        path: "/Manager",
        children: [
          {
            path: "/Manager/ELsayes-Front-End",
            element: <MyLayout children={<Home />} />,
          },
          {
            path: "/Manager/",
            element: <MyLayout children={<Home />} />,
          },
          {
            path: "/Manager/Show/workers",
            element: <MyLayout children={<ShowWorkers />} />,
          },
          {
            path: "/Manager/Show/packages",
            element: <MyLayout children={<ShowPackages />} />,
          },
          {
            path: "/Manager/Show/services",
            element: <MyLayout children={<ShowServices />} />,
          },
          {
            path: "/Manager/Update/Workers/:id",
            element: <MyLayout children={<UpdateWorker />} />,
          },
          {
            path: "/Manager/Delete/workers/:id",
            element: <MyLayout children={<DeleteWorker />} />,
          },
          {
            path: "/Manager/Add/Worker",
            element: <MyLayout children={<AddWorker />} />,
          },
          {
            path: "/Manager/Profile",
            element: <MyLayout children={<Profile />} />,
          },
        ],
      },
    ],
  },
  {
    element: <Owner />,
    children: [
      {
        path: "/Owner",
        children: [
          {
            path: "/Owner/Profile",
            element: <MyLayout children={<Profile />} />,
          },
          {
            path: "/Owner/ELsayes-Front-End",
            element: <MyLayout children={<OwnerHome />} />,
          },
          {
            path: "/Owner/",
            element: <MyLayout children={<OwnerHome />} />,
          },
          {
            path: "/Owner/Show/Managers",
            element: <MyLayout children={<ShowManagers />} />,
          },
          {
            path: "/Owner/Show/Branches",
            element: <MyLayout children={<ShowBranches />} />,
          },
          {
            path: "/Owner/Show/Owners",
            element: <MyLayout children={<ShowOwners />} />,
          },
          {
            path: "/Owner/Add/Manager",
            element: <MyLayout children={<AddManager />} />,
          },
          {
            path: "/Owner/Add/Branch",
            element: <MyLayout children={<AddBranch />} />,
          },
          {
            path: "/Owner/Add/Owner",
            element: <MyLayout children={<AddOwner />} />,
          },
          {
            path: "/Owner/Update/Branches/:id",
            element: <MyLayout children={<UpdateBranch />} />,
          },
          {
            path: "/Owner/Update/Owners/:id",
            element: <MyLayout children={<UpdateOwner />} />,
          },
          {
            path: "/Owner/Update/Managers/:id",
            element: <MyLayout children={<UpdateManager />} />,
          },
          {
            path: "/Owner/Delete/Branches/:id",
            element: <MyLayout children={<DeleteBranch />} />,
          },
          {
            path: "/Owner/Delete/Owners/:id",
            element: <MyLayout children={<DeleteOwner />} />,
          },
          {
            path: "/Owner/Delete/Managers/:id",
            element: <MyLayout children={<DeleteManager />} />,
          },
        ],
      },
    ],
  },
]);
