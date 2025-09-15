import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import Home from "./pages/Home";
import { MultiStepForm } from "./pages/MultiStepForm";
import PageNotFound from "./pages/PageNotFound";
import Setting from "./pages/Setting";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/افتتاح دسته چک" element={<MultiStepForm />} />
          <Route path="/form" element={<Form />} />
          <Route path="/افتتاح حساب" element={<Account />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
