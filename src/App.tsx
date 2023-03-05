import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Simulation from "./components/Simulation";
import ConfigHist from "./components/ConfigHist/ConfigHist";
import Header from "./components/Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        {/* <Header /> */}
        {/* <ConfigHist /> */}

        <Simulation />
      </div>
    </>
  );
}

export default App;
