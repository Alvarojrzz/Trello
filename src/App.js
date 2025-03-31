import './App.css';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Home from './pages/Home/home';


const App = () => {
  return (
    <div className="font-mono">
      <Header />  
      <Home />
      <Footer />
    </div>
  );
};


export default App;
