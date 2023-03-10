export function functionsToStringArray(F: number[][]) {
  // for element in array R, make a string where the value is a coefficient and the index is the subscript of x
  let stringArray: string[] = [];
  for (let i = 0; i < F.length; i++) {
    stringArray.push(functionToString(F[i]));
  }
  return stringArray;
}

function functionToString(F: number[]) {
  let string = "";

  for (let i = 0; i < F.length; i++) {
    if (F[i] != 0) {
      string += F[i] + "x_" + (i + 1) + " + ";
    }
  }
  string = string.slice(0, -3);
  return string;
}

export function createNeuron(VL, C, F, L, i) {
  // the value of each element in VL is the location of each variable in C
  let label = "";
  let functions = "";

  // Get the values of the variables
  for (let j = 0; j < VL.length; j++) {
    if (VL[j] === i + 1) {
      if (label !== "") {
        label += ", ";
      }
      label += C[j];
    }
  }

  // Get the functions of the neuron
  for (let j = 0; j < L.length; j++) {
    if (L[j][i] === 1) {
      functions += functionToString(F[j]) + "\n";
    }
  }

  return [
    {
      data: {
        id: "neuron" + i,
        label: label,
      },
      classes: "neuron",
    },
    {
      data: {
        parent: "neuron" + i,
        id: "neuron function" + i,
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
