function functionToString(F: number[], j: number, vars) {
  let string = "";

  string += "f_" + (j + 1) + "(";
  for (let i = 0; i < vars.length; i++) {
    string += "x_" + (vars[i] + 1) + ", ";
  }
  string = string.slice(0, -2);
  string += ") = ";
  for (let i = 0; i < F.length; i++) {
    if (F[i] != 0) {
      string +=
        (F[i] > 1 ? F[i] : F[i] < 1 ? F[i] : "") + "x_" + (i + 1) + " + ";
    }
  }
  string = string.slice(0, -3);
  return string;
}

export function createNeuron(VL, C, F, L, i) {
  let vars: number[] = [];
  let indices: number[] = [];
  let functions = `\\displaylines{`;

  // Get the values of the variables
  for (let j = 0; j < VL.length; j++) {
    if (VL[j] === i + 1) {
      vars.push(C[j]);
      indices.push(j);
    }
  }
  for (let i = 0; i < vars.length; i++) {
    functions += "x_" + (indices[i] + 1) + "[" + vars[i] + "]";
  }
  functions += "\\\\\\\\";

  // Get the functions of the neuron
  for (let j = 0; j < L.length; j++) {
    if (L[j][i] === 1) {
      functions += functionToString(F[j], j, indices) + "\\\\";
    }
  }
  functions += "}";

  return [
    {
      data: {
        id: "container" + i,
        label: "label",
      },
      classes: "neuron",
    },
    {
      data: {
        parent: "container" + i,
        id: "neuron" + i,
        label: functions,
      },
      position: {
        x: 100 * (10 * i),
        y: 100 + 100,
      },
      classes: "function",
    },
  ];
}
