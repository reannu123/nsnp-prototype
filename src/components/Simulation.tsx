/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import "./Simulation.css";
import { MathComponent } from "mathjax-react";
import generateConfigurations from "../utils/generateConfiguration.js";
import { CheckBox } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

function Simulation() {
  // States for the Input Fields
  const [inputConfig, setInputConfig] = useState("");
  const [inputFunction, setInputFunction] = useState("");
  const [inputFunctionLocation, setInputFunctionLocation] = useState("");
  const [inputSynapseList, setInputSynapseList] = useState("");
  const [inputThresholdList, setInputThresholdList] = useState("");
  const [inputVarLocList, setInputVarLocList] = useState("");
  // Control States
  const [timeSteps, setTimeSteps] = useState(0);
  const [guidedMode, setGuidedMode] = useState(false);

  // States for the History
  const [CHist, setCHist] = useState<number[][]>([]);
  const [SHist, setSHist] = useState<number[][][]>([]);
  const [PHist, setPHist] = useState<number[][][]>([]);

  // States for the Matrices
  const [C, setC] = useState([1, 1, 2]);
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
  const [SV, setSV] = useState<number[][]>([[]]);
  const [PM, setPM] = useState<number[][]>([[]]);

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
    console.log("CHist: ", CHist);
    if (inputConfig != "") {
      let matrixForm = "[" + inputConfig + "]";
      setC(JSON.parse(matrixForm));
      setInputConfig("");
      setCHist([]);
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

  function handleGuidedMode(e: any) {
    console.log(e.target.checked);
    if (e.target.checked) {
      setGuidedMode(true);
    } else {
      setGuidedMode(false);
    }
  }

  return (
    <>
      <div className="Row">
        <div
          style={{
            position: "absolute",
            left: "5em",
            top: "5em",
            width: "10%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <h3>Configuration History</h3>
          <div className="Column">
            {CHist.map((c) => (
              <div className="C" key={c[0]}>
                <MathComponent tex={matrixToString([c])} />
              </div>
            ))}
          </div>
        </div>

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
                <MathComponent tex={matrixToString([C])} />
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
            {guidedMode && !showNonSimMatrices && (
              <div className="C">
                <div className="matrix configuration">
                  <h2>Function Matrix</h2>
                  <MathComponent tex={matrixToString(F)} />
                </div>
                {!showSPMatrices && (
                  <div className="Row">
                    <input
                      className="input"
                      onChange={(e) => setInputFunction(e.target.value)}
                    />
                    <button onClick={handleFunctionChange}>Set</button>
                  </div>
                )}
              </div>
            )}
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
        </div>
        <div
          style={{
            position: "absolute",
            right: "5em",
            top: "5em",
            width: "10%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <h2>Time Step</h2>
          <div className="Column">{timeSteps}</div>
          <div className="C">
            <div className="matrix configuration">
              <h2>Guided Mode</h2>
              <Checkbox
                onChange={(e) => handleGuidedMode(e)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            </div>
          </div>
          <button
            className="generate"
            onClick={() => {
              let matrices = generateConfigurations(
                guidedMode,
                [C],
                1,
                L,
                F,
                T,
                VL,
                syn
              );
              let newC = matrices.unexploredStates[0];

              let newS = matrices.S;
              let newP = matrices.P;
              setC(newC);
              setSV(newS);
              setPM(newP);
              setCHist((CHist) => [...CHist, C]);
              setPHist((PHist) => [...PHist, newP]);
              setSHist((SHist) => [...SHist, newS]);

              setShowNonSimMatrices(false);
              setShowSPMatrices(true);
              setTimeSteps(timeSteps + 1);
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
          {timeSteps > 0 && (
            <>
              <button
                onClick={() => {
                  let newC = CHist[timeSteps - 1];
                  let newS = SHist[timeSteps - 1];
                  let newP = PHist[timeSteps - 1];
                  setC(newC);
                  setSV(newS);
                  setPM(newP);
                  setCHist(CHist.slice(0, timeSteps));
                  setPHist(PHist.slice(0, timeSteps));
                  setSHist(SHist.slice(0, timeSteps));
                  setTimeSteps(timeSteps - 1);
                }}
              >
                Undo
              </button>
              {/* Reset Button */}
              <button
                onClick={() => {
                  console.log("CHist: ", CHist);
                  setC(CHist[0]);
                  setSV([]);
                  setPM([]);
                  setCHist([]);
                  setPHist([]);
                  setSHist([]);
                  setTimeSteps(0);
                }}
              >
                Reset
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Simulation;
