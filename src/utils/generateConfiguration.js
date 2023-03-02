import { arrayEquals } from "./universal";
import { generateSM } from "./generateSV";
import { generatePM } from "./generatePM";

// Hard-coded Spiking Matrix
let S_debug = [
  [1, 0, 1, 0],
  [0, 1, 1, 0],
];

function addMatrix(A, B) {
  let C = [];
  for (let i = 0; i < A.length; i++) {
    C.push([]);
    for (let j = 0; j < A[i].length; j++) {
      C[i].push(A[i][j] + B[i][j]);
    }
  }
  return C;
}

function multiplyMatrix(A, B) {
  let C = [];
  for (let i = 0; i < A.length; i++) {
    C.push([]);
    for (let j = 0; j < B[0].length; j++) {
      C[i].push(0);
      for (let k = 0; k < B.length; k++) {
        C[i][j] = C[i][j] + A[i][k] * B[k][j];
      }
    }
  }
  return C;
}

function checkActiveVars(S, F) {
  // console.log("CHECK ACTIVE VARS: \nS: ", S, "\nF: ", F, "\n");
  let V = [];
  for (let i = 0; i < S.length; i++) {
    V.push([]);
    for (let j = 0; j < S[i].length; j++) {
      if (S[i][j] == 1) {
        // It means function j is active
        // Check for every active function which variable is active
        for (let k = 0; k < F[j].length; k++) {
          if (F[j][k] != 0) {
            if (V[i].length < k + 1) {
              V[i].push(0);
            } else {
              V[i][k] = 0;
            }
          } else {
            if (V[i].length < k + 1) {
              V[i].push(1);
            } else {
              if (V[i][k] != 0) {
                V[i][k] = 1;
              }
            }
          }
        }
      }
    }
  }
  return V;
}

// Algorithm 3: Computation Graph
// Generates computation graph from a given initial configuration
export default function generateConfigurations(C, maxDepth, L, F, T, VL, syn) {
  let unexploredStates = C;
  let exploredStates = [];
  // let graph = require("./graphType");
  // let currentNode = new graph.Node(C[0]);
  // let rootNode = currentNode;
  // let computationHistory = new graph.Graph(currentNode);

  let depth = 0;
  let currentDepth = 0;
  let S = [];
  let P = [];
  while (depth < maxDepth) {
    let nextstates = [];
    for (let i = 0; i < unexploredStates.length; i++) {
      // if (currentDepth != depth) {
      //   newNode = new graph.Node(unexploredStates[i]);
      //   currentNode.addChild(newNode);
      //   currentNode = newNode;
      //   currentDepth = depth;
      // }

      // console.log("Unexplored State: ", unexploredStates[i]);
      S = generateSM(unexploredStates[i], L, F, T);
      // S = S_debug;
      P = generatePM(unexploredStates[i], F, L, VL, syn, T);
      let V = checkActiveVars(S, F);
      let NG = multiplyMatrix(S, P);
      let C_next = addMatrix(V, NG);

      for (let j = 0; j < C_next.length; j++) {
        // For each configuration in C_next, check if it is already in ExploredStates
        // If it is not, add it to the nextstates array
        if (!exploredStates.find((x) => arrayEquals(x, C_next[j]))) {
          nextstates.push(C_next[j]);
        }

        // currentNode.addChild(new graph.Node(C_next[j]));
      }

      // Add unexplored states[i] to explored states
      exploredStates.push(unexploredStates[i]);

      // graph.printAncestry(currentNode);
    }
    // clear unexplored states
    unexploredStates = [];
    // Add nextstates to unexplored states
    unexploredStates = nextstates;
    // graph.printGraph(computationHistory);
    depth++;
  }
  return { unexploredStates, S, P };
}
