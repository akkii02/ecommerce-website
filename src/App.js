import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/Pages/About";
import RootLayout from "./components/Pages/Root";
import Product from "./components/Main/Product";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Product/> },
      { path: "/About", element: <About /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
