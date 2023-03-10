import cytoscape from "cytoscape";
let stylesheet: cytoscape.Stylesheet[] = [
  {
    selector: ".neuron",
    css: {
      content: "data(label)",
      "text-valign": "top",
      "text-halign": "center",
      shape: "roundrectangle",
      "background-color": "white",
      "border-color": "black",
    },
  },
  {
    selector: ".function",
    css: {
      content: "data(label)",
      "text-valign": "center",
      "text-halign": "center",
      "text-wrap": "wrap",
      "font-family": "Computer Modern",
      events: "no",
      // the box should not change color when selected
      "background-color": "white",
      shape: "roundrectangle",
      width: 200,
      height: 125,
    },
  },
  {
    selector: "edge",
    css: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      // "target-arrow-color": "black",
      // "line-color": "black",
      "text-valign": "center",
      "text-halign": "center",
      "text-background-color": "white",
      "text-background-opacity": 1,
      "text-background-shape": "roundrectangle",
      "text-rotation": "autorotate",
      "text-margin-y": -5,
    },
  },
];

export default stylesheet;
