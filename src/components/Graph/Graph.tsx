import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect, useRef, useState } from "react";
import { ElementDefinition } from "cytoscape";
import { functionsToStringArray } from "../../utils/helper";
export default function Graph(props) {
  const cyRef = useRef(cytoscape());
  const [elements, setElements] = useState(new Array<ElementDefinition>());

  function createSystem() {
    let newElements: ElementDefinition[] = [];
    // get the max value in props.VL
    let max = Math.max(...props.VL);
    for (let i = 0; i < max; i++) {
      let label = "";
      // the value of each element in VL is the location of each variable in C
      for (let j = 0; j < props.VL.length; j++) {
        if (props.VL[j] === i + 1) {
          if (label !== "") {
            label += ", ";
          }
          label += props.C[j];
        }
      }
      newElements.push({
        data: {
          id: "node" + i,
          label: label,
        },
        position: {
          x: 100 * (i + 1),
          y: 100,
        },
      });
    }

    // From props.syn, create a list of edges where the source and target are the nodes in the list of nodes
    for (let i = 0; i < props.syn.length; i++) {
      newElements.push({
        data: {
          source: "node" + (props.syn[i][0] - 1),
          target: "node" + (props.syn[i][1] - 1),
          label: props.syn[i][2],
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
      <button
        onClick={() => {
          props.functionToString;
        }}
      >
        Reset Variable
      </button>
      <CytoscapeComponent
        className="text-white"
        elements={elements}
        stylesheet={[
          {
            selector: "node[label]",
            style: {
              label: "data(label)",
              "font-size": "12",
              color: "white",
              "text-halign": "center",
              "text-valign": "center",
            },
          },
          {
            selector: "edge",
            style: {
              "curve-style": "bezier",
              "target-arrow-shape": "triangle",
              width: 1.5,
            },
          },
        ]}
        cy={(cy) => (cyRef.current = cy)}
        minZoom={0.5}
        maxZoom={2}
        style={{ width: "100vw", height: "100vh" }}
        wheelSensitivity={0.05}
      />
    </>
  );
}
