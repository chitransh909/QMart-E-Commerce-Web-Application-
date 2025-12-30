import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout"
import Thanks from "./components/Thanks"

export const config = {
  endpoint: `https://qkart-zeta.vercel.app/v1`,
};

function App() {
  return (
    <div className="App">
          <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/thanks" element={<Thanks/>} />
            <Route exact path="/" element={<Products/>} />
          </Routes>
    </div>
  );
}

export default App;
