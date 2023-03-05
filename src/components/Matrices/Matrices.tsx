import React from "react";
import { MathComponent } from "mathjax-react";

function Matrices(props) {
  return (
    <>
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
    </>
  );
}

export default Matrices;
