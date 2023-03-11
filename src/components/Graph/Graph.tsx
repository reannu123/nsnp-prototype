import cytoscape, { Stylesheet, StylesheetCSS } from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect, useRef, useState } from "react";
import { ElementDefinition } from "cytoscape";
import { createNeuron } from "../../utils/helper";
import ButtonBar from "./ButtonBar";
import stylesheet from "./stylesheet";
import NewNodeForm from "../forms/NewNodeForm";

export default function Graph(props) {
  const cyRef = useRef(cytoscape());
  const [elements, setElements] = useState(new Array<ElementDefinition>());
  const [selectedNode, setSelectedNode] = useState<string>("");

  // Show modals
  const [showNewNode, setShowNewNode] = useState(false);

  function createSystem() {
    let newElements: ElementDefinition[] = [];
    // get the max value in props.VL
    let max = Math.max(...props.VL);

    // Loop through the neurons
    for (let i = 0; i < max; i++) {
      // Create a neuron for each variable
      newElements.push(
        ...createNeuron(props.VL, props.C, props.F, props.L, i, props.T)
      );
    }

    // From props.syn, create a list of edges where the source and target are the nodes in the list of nodes
    for (let i = 0; i < props.syn.length; i++) {
      newElements.push({
        data: {
          id: "Synapse " + i,
          source: "Neuron " + props.syn[i][0],
          target: "Neuron " + props.syn[i][1],
          label: props.syn[i][2],
          classes: "edge",
        },
      });
    }
    setElements(newElements);
  }

  let layout = {
    name: "breadthfirst",
    animate: true,
  };

  // Create the system when the component is mounted
  useEffect(() => {
    createSystem();
  }, [props.C]);

  // Track events on the graph
  useEffect(() => {
    const cy = cyRef.current;
    cy.on("tap", function (event) {
      var evtTarget = event.target;

      if (evtTarget === cy) {
        console.log("tap on background");
        setSelectedNode("");
      } else {
        console.log("tap on : " + evtTarget.id());
        // If the element is a node, set the selected node to the id of the node
        if (evtTarget.isNode()) {
          setSelectedNode(evtTarget.id());
        }
        // If the element is an edge, set the selected node to the id of the edge
        else if (evtTarget.isEdge()) {
          console.log("Edge");
        }
        setSelectedNode(evtTarget.id());
      }
    });
  }, [cyRef]);

  return (
    <>
      <ButtonBar
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        showNewNode={showNewNode}
        setShowNewNode={setShowNewNode}
      />
      {showNewNode && (
        <NewNodeForm {...props} setShowNewNode={setShowNewNode} />
      )}
      <CytoscapeComponent
        elements={elements}
        boxSelectionEnabled={false}
        stylesheet={stylesheet}
        cy={(cy) => (cyRef.current = cy)}
        minZoom={0.5}
        maxZoom={2}
        style={{ width: "100vw", height: "100vh" }}
        layout={layout}
      />
    </>
  );
}
