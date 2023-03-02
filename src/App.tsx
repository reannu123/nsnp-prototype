import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Simulation from "./components/Simulation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>NSNP Simulation Prototype</h1>
      <div className="App">
        <div>
          <Simulation />
        </div>
      </div>
    </>
  );
}

export default App;
