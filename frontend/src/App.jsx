import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {
  return (
    <>
      {/* Creates a routing instance in React */}
      <BrowserRouter>
        {/* //Wrapper for each route */}
        <Routes>
          {/* //Individual route */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
