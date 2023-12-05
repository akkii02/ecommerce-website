import Header from '../Navbar/Header';
import Footer from '../Footer/Footer';
import CartProvider from '../store/CartProvider'
const RootLayout = (props) => {
      return(
            <CartProvider>
            <Header/>
            <main>{props.children}</main>
            <Footer/>
          </CartProvider>
      );
};

export default RootLayout;