import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App () {
return(
  <Router>
    <ToastContainer position="top-right" autoClose={3000}/>
        <Routes>
         <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/setting" element={<Setting/>}/>
            <Route path="auth" element={<Auth/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Route>
          <Route path="login" element={<Login/>}/>
        </Routes>
    </Router>  
)
}

export default App;