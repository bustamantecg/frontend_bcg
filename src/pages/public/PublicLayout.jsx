import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;