import { Outlet } from 'react-router-dom';
import Header from '../Navbar/Header';
import Footer from '../Footer/Footer';
import CartProvider from '../store/CartProvider'
const RootLayout = () => {
      return(
            <CartProvider>
            <Header/>
            <Outlet/>
            <Footer/>
          </CartProvider>
      );
};

export default RootLayout;