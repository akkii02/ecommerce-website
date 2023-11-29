import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/Pages/About";
import RootLayout from "./components/Pages/Root";
import Product from "./components/Main/Product";
import Home from "./components/Pages/Home";
import Contact from "./components/Pages/Contact";
import ProductView from "./components/Pages/ProductView";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Product/> },
      {path:"/Home",element:<Home/>},
      { path: "/About", element: <About /> },
      {path:"/Contact", element:<Contact/>},
      {path:"/ProductView", element:<ProductView/>},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
