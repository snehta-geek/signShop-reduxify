// import './App.css';
import Signup from './Components/signup';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseThrottleComp from './Components/useThrottle';
import Debounce from './Components/useDebounce';
import Signin from './Components/signin';
import Products from './Components/products';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return(
  
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/> 
        <Route path='/products' element={<Products/>}/>       
      
      </Routes>
      </Router>
      <ToastContainer />

      
    </div>
  )
}

export default App;
