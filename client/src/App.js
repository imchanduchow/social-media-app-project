import {BrowserRouter, Routes, Route} from "react-router-dom";

import './App.css';
import LoginForm from './components/pages/LoginForm';
import RegisterForm from './components/pages/RegisterForm';
import Navbar from './components/pages/Navbar';
import About from './components/pages/About';
import Profile from './components/pages/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<About />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="login" element={<LoginForm />}></Route>
            <Route path="register" element={<RegisterForm />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
