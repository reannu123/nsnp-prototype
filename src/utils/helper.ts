function functionsToStringArray(F: number[][]) {
  // for element in array R, make a string where the value is a coefficient and the index is the subscript of x
  let stringArray: string[] = [];
  for (let i = 0; i < F.length; i++) {
    let string = "";

    for (let j = 0; j < F[i].length; j++) {
      if (F[i][j] != 0) {
        string += F[i][j] + "x_" + (j + 1) + " + ";
      }
    }
    string = string.slice(0, -3);
    stringArray.push(string);
  }
  return stringArray;
}

export { functionsToStringArray };
