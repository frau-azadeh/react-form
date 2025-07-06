import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";

import Form from "./pages/Form";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import Account from "./pages/Account";
import { MultiStepForm } from "./pages/MultiStepForm";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/multiform" element={<MultiStepForm/>}/>
          <Route path="/form" element={<Form />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
