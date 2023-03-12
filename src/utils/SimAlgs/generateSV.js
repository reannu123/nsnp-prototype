// Algorithm 1: Spiking Matrix
// Consists of vectors containing functions that will spike
// Helper Functions
import { checkThreshold } from "./universal";

function computeCombination(n) {
  let combination = 1;
  for (let i = 0; i < n.length; i++) {
    if (n[i] != 0) {
      combination *= n[i];
    }
  }
  return combination;
}

// Computes for possible functions that can be activated
function computePossible(C, L, T, F) {
  // Initialize active matrix with size of Function Location matrix
  // let n be a list with number of elements equal to the number of neurons
  let n = [];
  for (let i = 0; i < L[0].length; i++) {
    n.push(0);
  }

  let active = [];
  for (let i = 0; i < L.length; i++) {
    active.push([]);
    for (let j = 0; j < L[i].length; j++) {
      active[i].push(0);
    }
  }

  // For each neuron in the system
  for (let j = 0; j < L[0].length; j++) {
    let count = 0;
    // For each function in the system
    for (let i = 0; i < L.length; i++) {
      // make sure the function is in the neuron
      if (L[i][j] == 1) {
        if (checkThreshold(C, i, T, F)) {
          active[i][j] = 1;
          count += 1;
        } else {
          active[i][j] = 0;
        }
      }
    }
    n[j] = count;
  }
  return { n, active };
}

function getFunctions(m, active) {
  let functions = [];
  for (let i = 0; i < active.length; i++) {
    if (active[i][m] == 1) {
      functions.push(i);
    }
  }
  return functions;
}

function selectOne(guidedMode, possible) {
  let n = possible.n;
  let active = possible.active;
  let guided = guidedMode;
  for (let i = 0; i < n.length; i++) {
    if (n[i] > 1) {
      // console.log("Neuron ", i + 1, " has ", n[i], " active functions");
      let getActiveFunctions = () => {
        let f = [];
        for (let j = 0; j < active.length; j++) {
          if (active[j][i] == 1) {
            f.push(j);
          }
        }
        return f;
      };
      let activeFunctions = getActiveFunctions();
      // console.log("Functions: ", activeFunctions);
      let selected;
      if (!guided) {
        // Randomize which function will be selected
        let random = Math.floor(Math.random() * activeFunctions.length);
        selected = activeFunctions[random];
        // console.log("Selected Function: ", selected);
      } else {
        let answer = prompt(
          "Select a function for neuron " + (i + 1) + " from " + activeFunctions
        );

        console.log("Selected Function: ", answer);
        selected = parseInt(answer);
      }
      for (let j = 0; j < active.length; j++) {
        if (activeFunctions.includes(j) && j != selected) {
          active[j][i] = 0;
          n[i] -= 1;
        }
      }
    }
  }
  return { n, active };
}

export function generateSM(C, L, F, T, guidedMode) {
  let possible = computePossible(C, L, T, F);
  let selected = selectOne(guidedMode, possible);

  let n = selected.n; // Number of functions
  let active = selected.active;
  let q = computeCombination(n, L, T); // Number of spiking vectors

  // console.log("Final selected: ", active);
  // Initialize matrix spiking matrix with size of combination x n
  let S = [];
  for (let i = 0; i < q; i++) {
    S.push([]);
    for (let j = 0; j < F.length; j++) {
      S[i].push(0);
    }
  }

  // for each neuron m find the number of possible spiking vectors
  for (let m = 0; m < L[0].length; m++) {
    let functions = getFunctions(m, active);

    // For each neuron, if the number of functions is 0, then set all the values of the spiking vector to 0
    if (n[m] == 0) {
      //for each element in functions, and for each row in S, set the value of S to 0
      for (let j = 0; j < functions.length; j++) {
        for (let k = 0; k < S.length; k++) {
          S[k][functions[j]] = 0;
        }
      }
    }
    // If the number of functions is 1, then set all the values of the spiking vector to 1
    else {
      for (let j = 0; j < functions.length; j++) {
        S[0][functions[j]] = 1;
      }
    }
  }
  return S;
}
