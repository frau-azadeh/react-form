import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PageNotFound from "./pages/PageNotFound";
import Setting from "./pages/Setting";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000}/>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/auth" element={<Auth />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
    </Router>
  );
}

export default App;
