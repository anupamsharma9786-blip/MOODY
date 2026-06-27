import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import FaceExpressionDetector from "./features/expression/components/FaceExpressionDetector"
import Protected from "./features/auth/components/Protected"

export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><h1>Home</h1></Protected>
    },
    {
        path:"/face",
        element:<FaceExpressionDetector/>
    }
])