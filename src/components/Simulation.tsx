/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import "./Simulation.css";
import { MathComponent } from "mathjax-react";
import generateConfigurations from "../utils/SimAlgs/generateConfiguration.js";
import { CheckBox } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header/Header";
import SubHeader from "./SubHeader/SubHeader";
import ConfigHist from "./ConfigHist/ConfigHist";
import Settings from "./Settings/Settings";
import Matrices from "./Matrices/Matrices";
import WorkSpace from "./WorkSpace/WorkSpace";
import Graph from "./Graph/Graph";
import saveAs from "file-saver";
import convert from "xml-js";

function Simulation() {
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

  let matrixProps = {
    C: C,
    VL: VL,
    F: F,
    L: L,
    T: T,
    syn: syn,
    setC: setC,
    setVL: setVL,
    setF: setF,
    setL: setL,
    setT: setT,
    setSyn: setSyn,
    setCHist: setCHist,
  };
  const [SV, setSV] = useState<number[][]>([[]]);
  const [PM, setPM] = useState<number[][]>([[]]);

  //States for Viewing components
  const [showNonSimMatrices, setShowNonSimMatrices] = useState(false);
  const [showSPMatrices, setShowSPMatrices] = useState(true);
  const [showConfigHist, setShowConfigHist] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGraph, setShowGraph] = useState(true);

  // Convert Matrix to Latex string

  function handleGuidedMode() {
    setGuidedMode(!guidedMode);
  }

  function handleGeneration() {
    let matrices = generateConfigurations(guidedMode, [C], 1, L, F, T, VL, syn);
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
  }

  function handleReset() {
    if (timeSteps == 0) {
      return;
    }
    setC(CHist[0]);
    setSV([]);
    setPM([]);
    setCHist([]);
    setPHist([]);
    setSHist([]);
    setTimeSteps(0);
  }

  function handleEditMatrices() {
    setShowNonSimMatrices(!showNonSimMatrices);
    setShowSPMatrices(!showSPMatrices);
  }

  function handleUndo() {
    if (timeSteps == 0) {
      return;
    }
    let newC = CHist[timeSteps - 1];
    let newS = SHist[timeSteps - 1];
    let newP = PHist[timeSteps - 1];
    setC(newC);
    setSV(newS);
    setPM(newP);
    setCHist(CHist.slice(0, timeSteps - 1));
    setPHist(PHist.slice(0, timeSteps - 1));
    setSHist(SHist.slice(0, timeSteps - 1));
    setTimeSteps(timeSteps - 1);
  }

  function handleRewind(index) {
    if (timeSteps == 0 || index > timeSteps) {
      return;
    }
    let newC = CHist[index];
    let newS = SHist[index];
    let newP = PHist[index];
    setC(newC);
    setSV(newS);
    setPM(newP);
    setCHist(CHist.slice(0, index));
    setPHist(PHist.slice(0, index));
    setSHist(SHist.slice(0, index));
    setTimeSteps(index);
    console.log("Index: ", index);
  }
  function handleOpenHistory() {
    setShowConfigHist(!showConfigHist);
    if (showSettings) {
      setShowSettings(false);
    }
  }
  function handleOpenSettings() {
    setShowSettings(!showSettings);
    if (showConfigHist) {
      setShowConfigHist(false);
    }
  }
  function handleShowGraph() {
    setShowGraph(!showGraph);
  }
  function handleSave() {
    const json = { C: C, VL: VL, F: F, L: L, T: T, syn: syn };
    const xml = JSON.stringify(json);
    console.log(JSON.parse(xml));

    const blob = new Blob([xml], { type: "text/xml;charset=utf-8" });
    let filename = JSON.stringify(C);
    saveAs(blob, filename + ".nsnp");
  }

  function handleLoad(target) {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      let json = JSON.parse(reader.result as string);
      setC(json.C);
      setVL(json.VL);
      setF(json.F);
      setL(json.L);
      setT(json.T);
      setSyn(json.syn);
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  }

  return (
    <>
      <Settings
        open={showSettings}
        onClose={handleOpenSettings}
        itemaction={handleGuidedMode}
        itemaction1={handleShowGraph}
        itemaction2={handleSave}
        itemaction3={handleLoad}
        checked1={showGraph}
        checked={guidedMode}
      />
      <ConfigHist
        open={showConfigHist}
        onClose={handleOpenHistory}
        list={CHist}
        itemAction={handleRewind}
      />
      <Header leftbutton={handleOpenSettings} rightbutton={handleOpenHistory} />
      <SubHeader
        forward={handleGeneration}
        reset={handleReset}
        edit={handleEditMatrices}
        undo={handleUndo}
        number={timeSteps}
        checkbox={handleShowGraph}
        checked={showGraph}
      />

      {showNonSimMatrices && <Matrices {...matrixProps} />}

      {showSPMatrices && !showGraph && <WorkSpace C={C} SV={SV} PM={PM} />}
      {!showNonSimMatrices && showGraph && <Graph {...matrixProps} />}
    </>
  );
}

export default Simulation;
