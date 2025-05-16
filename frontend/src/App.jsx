import "./App.css";
import { useState } from "react";
const URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [response, setResponse] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);
    setResponse(data.message);
  };

  return (
    <>
      <button onClick={handleClick}>Click Me</button>
      <h1>{response}</h1>
    </>
  );
}

export default App;
