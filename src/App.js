import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Switch, Route} from "react-router-dom";
import About from "./components/Pages/About";
import RootLayout from "./components/Pages/RootLayout";
import Product from "./components/Main/Product";
import Home from "./components/Pages/Home";
import Contact from "./components/Pages/Contact";
import ProductView from "./components/Pages/ProductView";
import { useContext } from "react";
import AuthContext from "./components/store/Auth-Context";
import AuthPage from "./components/Pages/AuthPage";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <RootLayout>
      <Switch>
        {!authCtx.isLoggedIn && (
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <>
            
            <Route path="/Home">
              <Home />
            </Route>
            <Route path="/" exact>
              <Product />
            </Route>
            <Route path="/About">
              <About />
            </Route>
            <Route path="/Contact">
              <Contact />
            </Route>
            <Route path="/ProductView">
              <ProductView />
            </Route>
          </>
        )}
      </Switch>
    </RootLayout>
  );
}

export default App;
