import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Topbar from "./components/topbar/topbar";
import Home from "./pages/Home/home";
//import "./styles/global.css";

function App() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

export default App;
