import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import DashboardPage from "./components/DashboardPage";
import DocumentEditor from "./components/DocumentEditor/DocumentEditor"
import Homepage from "./components/Homepage"
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import ProjectsPage from "./components/Projects/ProjectsPage";
import ProfilePage from "./components/Profile/ProfilePage";
import VideoConference from "./components/DocumentEditor/VideoConference";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/dashboard",
    element:<DashboardPage/>
  },
  {
    path:"/Projects",
    element:<ProjectsPage/>
  },
  {
    path:"/profile",
    element:<ProfilePage/>
  },
  {
    path:"/video-conference",
    element:<VideoConference/>
  }
  

  
]);
function App() {
  

  return (
    <>
    <RouterProvider router={appRouter} />
  </>
  )
}

export default App
