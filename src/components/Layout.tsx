import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <Header />

      <main className="flex-grow flex justify-center items-center ">
        <div 
          className="bg-white p-6 rounded-lg shadow-lg w-[clamp(300px,80%,1200px)] min-h-full flex flex-col"
          >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
