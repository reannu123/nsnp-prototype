import React from "react";
import { MathComponent } from "mathjax-react";
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
function WorkSpace(props) {
  return (
    <div className="workspace text-white">
      <div className="Column">
        <div className="Row">
          <div className="C">
            <div className="matrix configuration">
              <h2>Configuration Vector</h2>
              <MathComponent tex={matrixToString([props.C])} />
            </div>
          </div>
        </div>

        <div className="Row">
          <div className="C">
            <div className="matrix configuration">
              <h2>Spiking Vector</h2>
              <MathComponent tex={matrixToString(props.SV)} />
            </div>
          </div>

          <div className="C">
            <div className="matrix configuration">
              <h2>Production Matrix</h2>
              <MathComponent tex={matrixToString(props.PM)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
