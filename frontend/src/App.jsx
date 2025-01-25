import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import DocumentEditor from "./components/DocumentEditor"
import Homepage from "./components/Homepage"
import { createBrowserRouter,RouterProvider } from "react-router-dom"

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
