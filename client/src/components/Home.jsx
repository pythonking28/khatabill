import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import useVerifyUser from "../hooks/useVerifyUser";
const Home = () => {
  useVerifyUser()
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
};
export default Home;
