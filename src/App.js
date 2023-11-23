import './App.css';
import Header from './components/Navbar/Header';
import Product from './components/Main/Product';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import CartProvider from './components/store/CartProvider';

function App() {
  
  return (
    <CartProvider>
      <Header/>
      <Product/>
      <Footer/>
    </CartProvider>
  );
}

export default App;
