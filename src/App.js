import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Switch, Route,Redirect} from "react-router-dom";
// import About from "./components/Pages/About";
import RootLayout from "./components/Pages/RootLayout";
// import Product from "./components/Main/Product";
// import Home from "./components/Pages/Home";
// import Contact from "./components/Pages/Contact";
// import ProductView from "./components/Pages/ProductView";
import { Suspense, lazy, useContext } from "react";
import AuthContext from "./components/store/Auth-Context";
import AuthPage from "./components/Pages/AuthPage";

function App() {
  const Home = lazy(()=>import('./components/Pages/Home'));
  const Product = lazy(()=>import('./components/Main/Product'));
  const ProductView = lazy(()=>import('./components/Pages/ProductView'));
  const About = lazy(()=>import('./components/Pages/About'));
  const Contact = lazy(()=>import('./components/Pages/Contact'));
  const authCtx = useContext(AuthContext);
  return (
    <RootLayout>
      <Suspense fallback={<p>Loading...</p>}>
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
        
        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
        </Suspense>
    </RootLayout>
  );
}

export default App;
