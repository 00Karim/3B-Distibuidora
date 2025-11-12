import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Topbar from "./components/topbar/topbar";
import Home from "./pages/Home/home";
import Shop from "./pages/Shop/shop";
import Contact from "./pages/Contact/contact";
//import "./styles/global.css";

function App() {
  return (
    <>
      <Router>
        <Topbar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pedido" element={<Shop />}></Route>
          <Route path="/contacto" element={<Contact />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
