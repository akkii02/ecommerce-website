import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Navbar/Header';
import Product from './components/Main/Product';
import Footer from './components/Footer/Footer';
import '@fortawesome/fontawesome-svg-core/styles.css';

function App() {
  return (
    <div>
      <Header/>
      <Product/>
      <Footer/>
    </div>
  );
}

export default App;
