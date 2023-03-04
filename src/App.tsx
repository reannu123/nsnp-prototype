import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Simulation from "./components/Simulation";
import ConfigHist from "./components/ConfigHist/ConfigHist";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <div>
          <ConfigHist />

          <Simulation />
        </div>
      </div>
    </>
  );
}

export default App;
