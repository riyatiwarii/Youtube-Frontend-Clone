import NavBar from "../src/components/Navbar/Navbar"
import Sidebar from "../src/components/SideBar/Sidebar"
import MainSection from "../src/components/MainSection/MainSection"
// import WatchVideo from "../src/components/WatchVideo/WatchVideo"
import {createBrowserRouter, Outlet} from "react-router-dom";
import WatchPage from "./components/WatchPage/WatchPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const App = () => {
  return (
    <div className="dark:text-gray-100 dark:bg-black duration-100">
        <NavBar/>
        <Sidebar/>
        <Outlet></Outlet>
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <MainSection/>
      },
      {
        path: "/watch",
        element: <WatchPage/>
      },
      {
        path: "/:category",
        element: <MainSection/>
      },
    ]
  }
])

export default appRouter;
