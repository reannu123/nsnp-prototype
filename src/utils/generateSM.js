// Algorithm 1: Spiking Matrix
// Consists of vectors containing functions that will spike
// Helper Functions
const universal = require("./universal");
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
        if (universal.checkThreshold(C, i, T, F)) {
          active[i][j] = 1;
          count += 1;
        } else {
          active[i][j] = 0;
        }
      }
    }
    n[j] = count;
  }
  // console.log(active);
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

function generateSM(C, L, F, T) {
  let possible = computePossible(C, L, T, F);
  let n = possible.n; // Number of functions
  let active = possible.active;
  let q = computeCombination(n, L, T); // Number of spiking vectors

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

    // console.log("\nNeuron ", m);
    // console.log("n", n);
    // console.log("Functions ", functions);

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
      let i = 0;
      let p = n[m] / q;
      // console.log("\nn[m]: ", n[m]);
      // console.log("Q: ", q);
      // console.log("P: ", p);
      // console.log("\n");
      for (let j = 0; j < functions.length; j++) {
        //correct
        let k = 0;
        while (k < p) {
          // console.log("i", i);
          // console.log("j", j);
          // console.log("K", k);
          // console.log("P", p);
          S[i][functions[j]] = 1;
          // console.log("S", S);

          k++;
          i++;
        }
      }
    }

    q = n[m] / q;
  }
  return S;
}

module.exports = { generateSM };
