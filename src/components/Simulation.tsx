import React from "react";
import { useState } from "react";
import "./Simulation.css";
import { MathComponent } from "mathjax-react";
import generateConfigurations from "../utils/generateConfiguration.js";

function Simulation() {
  // States for the Input Fields
  const [inputConfig, setInputConfig] = useState("");
  const [inputFunction, setInputFunction] = useState("");
  const [inputFunctionLocation, setInputFunctionLocation] = useState("");
  const [inputSynapseList, setInputSynapseList] = useState("");
  const [inputThresholdList, setInputThresholdList] = useState("");
  const [inputVarLocList, setInputVarLocList] = useState("");

  // States for the Matrices
  const [C, setC] = useState([[1, 1, 2]]);
  const [VL, setVL] = useState([1, 1, 2]);
  const [F, setF] = useState([
    [1, 1, 0],
    [0.5, 0.5, 0],
    [0, 0, 1],
    [0, 0, 0.5],
  ]);
  const [L, setL] = useState([
    [1, 0],
    [1, 0],
    [0, 1],
    [0, 1],
  ]);
  const [T, setT] = useState([[4, 4]]);
  const [syn, setSyn] = useState([
    [1, 2],
    [2, 1],
  ]);
  const [SV, setSV] = useState([[]]);
  const [PM, setPM] = useState([[]]);

  //States for Viewing components
  const [showNonSimMatrices, setShowNonSimMatrices] = useState(true);
  const [showSPMatrices, setShowSPMatrices] = useState(false);

  // Convert Matrix to Latex string
  function matrixToString(matrix: number[][]) {
    let string = `\\left(\\begin{array}{ccc} `;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        string += matrix[i][j];
        if (j < matrix[i].length - 1) {
          string += `&`;
        }
      }
      if (i < matrix.length - 1) {
        string += ` \\\\ `;
      }
    }
    string += ` \\end{array}\\right)`;
    return string;
  }

  // Changing of Configuration Vector
  function handleConfigChange() {
    if (inputConfig != "") {
      let matrixForm = "[[" + inputConfig + "]]";
      setC(JSON.parse(matrixForm));
      setInputConfig("");
    }
  }

  function handleFunctionChange() {
    if (inputFunction != "") {
      let matrixForm = "[" + inputFunction + "]";
      setF(JSON.parse(matrixForm));
      setInputFunction("");
    }
  }

  function handleFunctionLocationChange() {
    if (inputFunctionLocation != "") {
      let matrixForm = "[" + inputFunctionLocation + "]";
      setL(JSON.parse(matrixForm));
      setInputFunctionLocation("");
    }
  }

  function handleSynapseListChange() {
    if (inputSynapseList != "") {
      let matrixForm = "[" + inputSynapseList + "]";
      setSyn(JSON.parse(matrixForm));
      setInputSynapseList("");
    }
  }

  function handleThresholdListChange() {
    if (inputThresholdList != "") {
      let matrixForm = "[" + inputThresholdList + "]";
      setT(JSON.parse(matrixForm));
      setInputThresholdList("");
    }
  }

  function handleVarLocListChange() {
    if (inputVarLocList != "") {
      let matrixForm = "[" + inputVarLocList + "]";
      setVL(JSON.parse(matrixForm));
      setInputVarLocList("");
    }
  }

  return (
    <div className="Column">
      {showNonSimMatrices && (
        <div className="Row">
          <div className="C">
            <div className="matrix configuration">
              <h2>Function Matrix</h2>
              <MathComponent tex={matrixToString(F)} />
            </div>
            <div className="Row">
              <input
                className="input"
                onChange={(e) => setInputFunction(e.target.value)}
              />
              <button onClick={handleFunctionChange}>Set</button>
            </div>
          </div>

          <div className="C">
            <div className="matrix configuration">
              <h2>Function Location Matrix</h2>
              <MathComponent tex={matrixToString(L)} />
            </div>
            <div className="Row">
              <input
                className="input"
                onChange={(e) => setInputFunctionLocation(e.target.value)}
              />
              <button onClick={handleFunctionLocationChange}>Set</button>
            </div>
          </div>
          <div className="C">
            <div className="matrix configuration">
              <h2>Synapse List</h2>
              <MathComponent tex={matrixToString(syn)} />
            </div>
            <div className="Row">
              <input
                className="input"
                onChange={(e) => setInputSynapseList(e.target.value)}
              />
              <button onClick={handleSynapseListChange}>Set</button>
            </div>
          </div>

          <div className="C">
            <div className="matrix configuration">
              <h2>Threshold List</h2>
              <MathComponent tex={matrixToString(T)} />
            </div>
            <div className="Row">
              <input
                className="input"
                onChange={(e) => setInputThresholdList(e.target.value)}
              />
              <button onClick={handleThresholdListChange}>Set</button>
            </div>
          </div>

          <div className="C">
            <div className="matrix configuration">
              <h2>Variable Location List</h2>
              <MathComponent tex={matrixToString([VL])} />
            </div>
            <div className="Row">
              <input
                className="input"
                onChange={(e) => setInputVarLocList(e.target.value)}
              />
              <button onClick={handleVarLocListChange}>Set</button>
            </div>
          </div>
        </div>
      )}

      <div className="Row">
        <div className="C">
          <div className="matrix configuration">
            <h2>Configuration Vector</h2>
            <MathComponent tex={matrixToString(C)} />
          </div>
          {!showSPMatrices && (
            <div className="Row">
              <input
                className="input"
                onChange={(e) => setInputConfig(e.target.value)}
              />
              <button onClick={handleConfigChange}>Set</button>
            </div>
          )}
        </div>
      </div>
      {showSPMatrices && (
        <div className="Row">
          <div className="C">
            <div className="matrix configuration">
              <h2>Spiking Vector</h2>
              <MathComponent tex={matrixToString(SV)} />
            </div>
          </div>

          <div className="C">
            <div className="matrix configuration">
              <h2>Production Matrix</h2>
              <MathComponent tex={matrixToString(PM)} />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          let matrices = generateConfigurations(C, 1, L, F, T, VL, syn);
          let newC = matrices.unexploredStates;
          let newS = matrices.S;
          let newP = matrices.P;
          setC(newC);
          setSV(newS);
          setPM(newP);
          setShowNonSimMatrices(false);
          setShowSPMatrices(true);
        }}
      >
        Generate New Configuration
      </button>
      {showSPMatrices && (
        <button
          onClick={() => {
            setShowNonSimMatrices(true);
            setShowSPMatrices(false);
          }}
        >
          Edit Matrices
        </button>
      )}
    </div>
  );
}

export default Simulation;
