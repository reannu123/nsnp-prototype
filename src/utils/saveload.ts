import saveAs from "file-saver";
import convert from "xml-js";
function handleSave(props) {
  const json = {
    C: props.C,
    VL: props.VL,
    F: props.F,
    L: props.L,
    T: props.T,
    syn: props.syn,
    envSyn: props.envSyn,
  };
  const xml = JSON.stringify(json);
  console.log(JSON.parse(xml));

  const blob = new Blob([xml], { type: "text/xml;charset=utf-8" });
  let filename = JSON.stringify(props.C);
  saveAs(blob, filename + ".nsnp");
}

function handleLoad(target, props) {
  let file = target.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    let json = JSON.parse(reader.result as string);
    props.setC(json.C);
    props.setVL(json.VL);
    props.setF(json.F);
    props.setL(json.L);
    props.setT(json.T);
    props.setSyn(json.syn);
    props.setEnvSyn(json.envSyn);
    const matrices = JSON.stringify(json);
    localStorage.setItem("Matrices", matrices);
  };
  reader.onerror = function () {
    console.log(reader.error);
  };
}

export { handleSave, handleLoad };
