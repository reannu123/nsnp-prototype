import cytoscape, { Stylesheet, StylesheetCSS } from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect, useRef, useState } from "react";
import { ElementDefinition } from "cytoscape";
import { createNeuron, functionsToStringArray } from "../../utils/helper";
import ButtonBar from "./ButtonBar";
import stylesheet from "./stylesheet";

export default function Graph(props) {
  const cyRef = useRef(cytoscape());
  const [elements, setElements] = useState(new Array<ElementDefinition>());

  function createSystem() {
    let newElements: ElementDefinition[] = [];
    // get the max value in props.VL
    let max = Math.max(...props.VL);

    // Loop through the neurons
    for (let i = 0; i < max; i++) {
      // Create a neuron for each variable
      newElements.push(...createNeuron(props.VL, props.C, props.F, props.L, i));
      console.log(newElements);
    }

    // From props.syn, create a list of edges where the source and target are the nodes in the list of nodes
    for (let i = 0; i < props.syn.length; i++) {
      newElements.push({
        data: {
          source: "neuron" + (props.syn[i][0] - 1),
          target: "neuron" + (props.syn[i][1] - 1),
          label: props.syn[i][2],
          classes: "edge",
        },
      });
    }
    setElements(newElements);
  }

  useEffect(() => {
    createSystem();
  }, [props.C]);

  return (
    <>
      <ButtonBar />
      <CytoscapeComponent
        elements={elements}
        boxSelectionEnabled={false}
        stylesheet={stylesheet}
        cy={(cy) => (cyRef.current = cy)}
        minZoom={1.2}
        maxZoom={2}
        style={{ width: "100vw", height: "100vh" }}
      />
    </>
  );
}
