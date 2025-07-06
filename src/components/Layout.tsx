import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <Header />
      <main className="flex-grow flex justify-center items-center mt-20 mb-5">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[clamp(300px,80%,1200px)] min-h-full flex flex-col">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
